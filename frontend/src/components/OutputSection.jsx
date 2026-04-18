import React, { useContext, useState } from 'react';
import { LogContext } from '../context/LogContext';
import { humanizeLogAPI } from '../services/api';
import { Copy, RefreshCw, CheckCircle2, User } from 'lucide-react';

const OutputSection = () => {
  const { logs, setLogs, aiScore, role, loading } = useContext(LogContext);
  const [copiedId, setCopiedId] = useState(null);
  const [humanizingId, setHumanizingId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleHumanize = async (index, text) => {
    setHumanizingId(index);
    try {
      const res = await humanizeLogAPI(text, role);
      if (res.success) {
        const newLogs = [...logs];
        newLogs[index].description = res.humanizedText;
        setLogs(newLogs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setHumanizingId(null);
    }
  };

  if (loading) {
    return (
      <div className="glass-panel empty-state">
        <div className="loader" style={{ width: '40px', height: '40px', borderWidth: '4px', borderColor: 'rgba(59, 130, 246, 0.3)', borderTopColor: '#3b82f6', marginBottom: '1rem' }}></div>
        <p>AI is generating your professional logs...</p>
      </div>
    );
  }

  if (!logs || logs.length === 0) {
    return (
      <div className="glass-panel empty-state">
        <div className="empty-icon">📝</div>
        <h3>No logs generated yet</h3>
        <p>Fill in the details and click generate to see your professional logs here.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel fade-in">
      <h2 className="section-title">✨ Generated Output</h2>
      
      {logs.map((log, idx) => (
        <div key={idx} className="log-section fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
          <div className="log-header">
            <span className="log-duration">{log.duration}</span>
            <div className="log-actions">
              <button 
                className="btn-secondary" 
                onClick={() => handleHumanize(idx, log.description)}
                disabled={humanizingId === idx}
              >
                {humanizingId === idx ? <RefreshCw size={16} className="loader" style={{ width: 16, height: 16, borderWidth: 2 }} /> : <User size={16} />}
                Humanize
              </button>
              <button 
                className="btn-secondary" 
                onClick={() => handleCopy(log.description, idx)}
              >
                {copiedId === idx ? <CheckCircle2 size={16} style={{ color: '#10b981' }} /> : <Copy size={16} />}
                Copy
              </button>
            </div>
          </div>
          <div className="log-content">
            {log.description}
          </div>
        </div>
      ))}

      {aiScore && (
        <div className="score-container fade-in">
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>AI Detection Simulation</h3>
          <div className="score-labels">
            <span>Human-like: {aiScore.human}%</span>
            <span>AI-like: {aiScore.ai}%</span>
          </div>
          <div className="score-bar">
            <div className="score-human" style={{ width: `${aiScore.human}%` }}></div>
            <div className="score-ai" style={{ width: `${aiScore.ai}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputSection;
