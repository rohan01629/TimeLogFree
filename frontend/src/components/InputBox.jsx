import React, { useContext } from 'react';
import { LogContext } from '../context/LogContext';

const InputBox = () => {
  const { input, setInput } = useContext(LogContext);

  return (
    <div className="glass-panel">
      <h2 className="section-title">📝 Work Details</h2>
      <div className="form-group">
        <label className="form-label">Rough Notes (English or Hinglish)</label>
        <textarea
          className="form-textarea"
          placeholder='e.g., "login bug fix kiya, API test ki, thoda UI change kiya, team se discussion hua"'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default InputBox;
