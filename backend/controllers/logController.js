const Log = require('../models/Log');
const { OpenAI } = require('openai');
require('dotenv').config();

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

// Mock function for when OpenAI key is not available
const generateMockLogs = (input, role, tone, splits) => {
  const variations = [
    `Started by focusing on: ${input}. Analyzed the requirements and mapped out the initial approach. Completed necessary planning.`,
    `Continued working on the main objectives. Handled edge cases and ensured the implementation aligns with best practices.`,
    `Deep dived into the technical details. Debugged issues, refined the code structure, and ensured stability.`,
    `Finalized the tasks related to the core requirements. Performed thorough testing and verified the expected outcomes.`,
    `Wrapped up the remaining items. Documented the changes and prepared everything for the next review phase.`
  ];
  return splits.map((duration, index) => ({
    duration,
    description: `As a ${role}, spent ${duration} on this segment. ${variations[index % variations.length]}`
  }));
};


exports.generateLog = async (req, res) => {
  try {
    const { input, role, tone, splits } = req.body;

    if (!input || !role || !splits || !Array.isArray(splits)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let generatedLogs = [];

    const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
    const openaiClient = apiKey ? new OpenAI({
      apiKey: apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    }) : null;

    if (openaiClient) {
      const prompt = `
You are an assistant that writes realistic, professional daily work logs.

TASK:
Convert the following rough notes into a structured daily work log for a ${role}.

REQUIREMENTS:
- Tone: ${tone}
- Total sections: ${splits.length}
- Section durations: ${splits.join(', ')}

WRITING STYLE:
- Each section must contain 3–5 lines written as a natural paragraph (NOT bullet points)
- The writing should feel human, slightly varied, and not overly polished
- Use role-appropriate terminology naturally (avoid overuse of jargon)
- Maintain a logical flow of work across sections (like a real workday progression)
- Avoid repetitive sentence structures and phrases

CONTENT RULES:
- Each section MUST describe a different part/aspect of the work
- Do NOT repeat or rephrase the same content across sections
- Expand short inputs into realistic and practical work activities (e.g., debugging, testing, meetings, implementation, analysis, coordination)
- Keep the descriptions believable and specific, not generic

LANGUAGE RULE:
- Output must be strictly in English, regardless of input language

INPUT:
"${input}"

OUTPUT FORMAT (STRICT):
Return ONLY a valid JSON object in the following format:
{
  "logs": [
    {
      "duration": "string",
      "description": "string"
    }
  ]
}

IMPORTANT:
- The number of objects in "logs" MUST be exactly ${splits.length}
- Each "duration" must match the provided durations in order
- Do not include any text outside the JSON
`;

      const response = await openaiClient.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "system", content: "You are a professional assistant helping engineers write daily time logs." }, { role: "user", content: prompt }],
        response_format: { type: "json_object" } // need to wrap in an object for JSON mode
      });

      // Better approach for JSON parsing
      const jsonStr = response.choices[0].message.content;
      try {
        const parsed = JSON.parse(jsonStr);
        // Sometimes it returns { "logs": [...] } or just [...]
        generatedLogs = Array.isArray(parsed) ? parsed : (parsed.logs || Object.values(parsed)[0]);
      } catch (e) {
        // fallback
        generatedLogs = generateMockLogs(input, role, tone, splits);
      }
    } else {
      generatedLogs = generateMockLogs(input, role, tone, splits);
    }

    // Mock AI Score
    const aiScore = {
      human: Math.floor(Math.random() * 40) + 60, // 60-99
    };
    aiScore.ai = 100 - aiScore.human;

    const newLog = new Log({
      originalInput: input,
      role,
      generatedLogs,
      aiScore
    });

    await newLog.save();

    res.json({ success: true, data: newLog });
  } catch (error) {
    console.error('Error generating log:', error);
    const errorMessage = error.error?.message || error.message || 'Failed to generate log';
    res.status(500).json({ error: errorMessage });
  }
};

exports.humanizeLog = async (req, res) => {
  try {
    const { text, role } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
    const openaiClient = apiKey ? new OpenAI({
      apiKey: apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    }) : null;

    if (openaiClient) {
      const response = await openaiClient.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          { 
            role: "system", 
            content: `
You are an assistant that refines work logs to make them sound highly natural and realistic.

TASK:
Rewrite the following work log for a ${role} to sound more human, with natural phrasing, slight imperfections, and varied sentence lengths.

WRITING STYLE:
- Write as a natural paragraph (NOT bullet points)
- The writing should feel human, slightly varied, and not overly polished
- Use role-appropriate terminology naturally (avoid overuse of jargon)
- Avoid repetitive sentence structures and phrases
- Maintain a professional yet practical tone

LANGUAGE RULE:
- Output must be strictly in English, regardless of input language
- Return ONLY the rewritten text, with no extra commentary.
` 
          },
          { role: "user", content: text }
        ],
      });
      res.json({ success: true, humanizedText: response.choices[0].message.content.trim() });
    } else {
      res.json({ success: true, humanizedText: text + ' (Humanized version)' });
    }
  } catch (error) {
    console.error('Error humanizing log:', error);
    res.status(500).json({ error: 'Failed to humanize log' });
  }
};

exports.calculateAiScore = async (req, res) => {
  try {
    const { text } = req.body;
    // In a real app, this would use a heuristic or another API
    const humanScore = Math.floor(Math.random() * 40) + 60;
    res.json({ success: true, score: { human: humanScore, ai: 100 - humanScore } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate AI score' });
  }
};
