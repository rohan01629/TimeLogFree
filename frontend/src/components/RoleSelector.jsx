import React, { useContext, useState } from 'react';
import { LogContext } from '../context/LogContext';

const roles = [
  'Developer',
  'QA (Manual)',
  'QA (Automation)',
  'DevOps',
  'Cloud Engineer',
  'Data/Analytics',
  'Support/Operations',
  'Other'
];

const RoleSelector = () => {
  const { role, setRole } = useContext(LogContext);
  const [customRole, setCustomRole] = useState('');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="glass-panel">
      <h2 className="section-title">🧑‍💻 Role Selection</h2>
      <div className="form-group">
        <label className="form-label">Select Your Role</label>
        <select className="form-select" value={role === 'Other' ? (roles.includes(role) ? role : 'Other') : role} onChange={handleRoleChange}>
          {roles.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      
      {role === 'Other' && (
        <div className="form-group fade-in">
          <label className="form-label">Custom Role</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Enter custom role" 
            value={customRole}
            onChange={(e) => {
              setCustomRole(e.target.value);
              if (e.target.value) setRole(e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RoleSelector;
