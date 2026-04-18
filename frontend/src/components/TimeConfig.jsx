import React, { useContext } from 'react';
import { LogContext } from '../context/LogContext';

const TimeConfig = () => {
  const { 
    totalHours, setTotalHours, 
    splitMode, setSplitMode, 
    customSplits, setCustomSplits 
  } = useContext(LogContext);

  const handleCustomSplitCount = (count) => {
    const newSplits = Array(parseInt(count)).fill('0');
    setCustomSplits(newSplits);
  };

  const handleSplitValue = (index, value) => {
    const newSplits = [...customSplits];
    newSplits[index] = value;
    setCustomSplits(newSplits);
  };

  return (
    <div className="glass-panel">
      <h2 className="section-title">⏳ Time Configuration</h2>
      
      <div className="form-group">
        <label className="form-label">Total Hours</label>
        <input 
          type="number" 
          className="form-input" 
          value={totalHours} 
          onChange={(e) => setTotalHours(Number(e.target.value))}
          min="1" max="24"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Section Split</label>
        <div className="split-options">
          <label className="radio-label">
            <input 
              type="radio" 
              name="splitMode" 
              checked={splitMode === 'auto'} 
              onChange={() => setSplitMode('auto')} 
            />
            Auto (Equal 2 Halves)
          </label>
          <label className="radio-label">
            <input 
              type="radio" 
              name="splitMode" 
              checked={splitMode === 'custom'} 
              onChange={() => setSplitMode('custom')} 
            />
            Custom Split
          </label>
        </div>

        {splitMode === 'custom' && (
          <div className="custom-split-container fade-in">
            <label className="form-label" style={{ fontSize: '0.85rem' }}>Number of Sections:</label>
            <select className="form-select" style={{ marginBottom: '0.5rem' }} value={customSplits.length} onChange={(e) => handleCustomSplitCount(e.target.value)}>
              {[2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Sections</option>)}
            </select>
            
            <div className="split-inputs">
              {customSplits.map((val, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <input 
                    type="number" 
                    step="0.5"
                    className="form-input split-input" 
                    value={val} 
                    onChange={(e) => handleSplitValue(idx, e.target.value)}
                  />
                  <span>h</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeConfig;
