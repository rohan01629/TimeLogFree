# ⏳ TimeLog Assistant

TimeLog Assistant is an intelligent, full-stack web application designed for software engineers and corporate professionals. It takes rough, informal daily notes (in English, Hindi, or Hinglish) and instantly transforms them into highly professional, nicely formatted, role-specific daily work logs using AI.

## 🌟 Key Features

- **Multi-Lingual Input**: Accepts raw, messy notes in any language (like Hinglish: "UI fix kiya, API call check ki").
- **Strict English Output**: Regardless of the input language, the generated logs are strictly generated in professional English.
- **Time-Splitting**: Automatically divides the generated work logs into multiple distinct sections based on user-defined time chunks (e.g., 2h, 4h, 1h).
- **Role-Specific Context**: Tailors the vocabulary and technical depth based on the selected role (e.g., Backend Developer, QA Manual, DevOps).
- **"Humanize" Tone Adjustment**: An integrated button that rewrites overly robotic AI text to sound more natural, varied, and practical.
- **Stunning UI**: Built with responsive Glassmorphism design and custom Vanilla CSS (Dark/Light mode ready).

## 🚀 Tech Stack

- **Frontend**: React (Vite), Context API, Axios, Lucide React (Icons)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **AI Engine**: Groq API (`llama-3.1-8b-instant` model)

## 📂 Project Structure

This project is a Monorepo containing both the frontend and backend.

```
TimeLogFree/
├── backend/                  # Express.js Server
│   ├── controllers/          # Business logic and AI prompts
│   ├── models/               # MongoDB Database Schemas
│   ├── routes/               # API endpoint definitions
│   └── server.js             # Main entry point
│
└── frontend/                 # React.js Client
    ├── src/
    │   ├── components/       # Reusable UI components
    │   ├── context/          # React Context for state management
    │   ├── services/         # Axios API calls
    │   └── App.jsx           # Main application layout
```

## ⚙️ Local Development Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine. 

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/rohan01629/TimeLogFree.git
cd TimeLogFree
\`\`\`

### 2. Install Dependencies
Install dependencies for both the frontend and backend:
\`\`\`bash
cd backend
npm install
cd ../frontend
npm install
\`\`\`

### 3. Environment Variables
In the `backend` directory, create a `.env` file and add the following keys:
\`\`\`env
MONGO_URI=mongodb://127.0.0.1:27017/timelog # Or your MongoDB Atlas URI
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
\`\`\`

*(You can obtain a free Groq API key from [console.groq.com](https://console.groq.com/))*

### 4. Run the Application
From the **root folder** (`TimeLogFree/`), you can run both servers concurrently:
\`\`\`bash
npm run dev
\`\`\`
- The **Frontend** will start at `http://localhost:5173`
- The **Backend** will start at `http://localhost:5000`

---

## ☁️ Deployment Guide

### Database (MongoDB Atlas)
1. Create a free M0 cluster on MongoDB Atlas.
2. Under "Network Access", ensure you allow connections from anywhere (`0.0.0.0/0`) so cloud servers can connect.
3. Get your connection string (remember to URL-encode any special characters in your password, e.g., `@` becomes `%40`).

### Backend (Render)
1. Create a new Web Service on Render and connect this repository.
2. **Root Directory**: `backend`
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. Add `MONGO_URI` and `GROQ_API_KEY` to your Environment Variables.

### Frontend (Vercel)
1. Create a new Vite Project on Vercel and connect this repository.
2. **Root Directory**: `frontend`
3. Add `VITE_API_URL` to your Environment Variables and set it to your deployed Render backend URL (e.g., `https://your-backend.onrender.com/api`).
4. Click Deploy!