import React, { useContext, useState } from 'react';
import { LogContext } from '../context/LogContext';
import { generateLogAPI } from '../services/api';
import { Wand2, Loader2 } from 'lucide-react';

const ControlsPanel = () => {
  const { 
    tone, setTone, 
    input, role, getSplitDurations,
    setLogs, setAiScore,
    loading, setLoading 
  } = useContext(LogContext);
  
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!input) {
      setError('Please enter rough notes first.');
      return;
    }
    setError('');
    setLoading(true);
    
    try {
      const splits = getSplitDurations();
      const res = await generateLogAPI({ input, role, tone, splits });
      if (res.success) {
        setLogs(res.data.generatedLogs);
        setAiScore(res.data.aiScore);
      }
    } catch (err) {
      console.error(err);
      const backendError = err.response?.data?.error;
      setError(backendError || 'Failed to generate log. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ marginTop: 'auto' }}>
      <h2 className="section-title">⚙️ Controls</h2>
      
      <div className="form-group">
        <label className="form-label">Tone</label>
        <select className="form-select" value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="Formal">Formal</option>
          <option value="Balanced">Balanced (Default)</option>
          <option value="Casual">Slightly Casual</option>
        </select>
      </div>

      {error && <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}

      <button className="btn-primary" onClick={handleGenerate} disabled={loading}>
        {loading ? <Loader2 className="loader" /> : <Wand2 size={20} />}
        {loading ? 'Generating...' : 'Generate Logs'}
      </button>
    </div>
  );
};

export default ControlsPanel;
