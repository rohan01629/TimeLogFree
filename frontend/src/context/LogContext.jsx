import React, { createContext, useState } from 'react';

export const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [role, setRole] = useState('Developer');
  const [totalHours, setTotalHours] = useState(8);
  const [splitMode, setSplitMode] = useState('auto'); // 'auto' or 'custom'
  const [customSplits, setCustomSplits] = useState(['4', '4']);
  const [tone, setTone] = useState('Balanced');
  
  const [logs, setLogs] = useState([]);
  const [aiScore, setAiScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSplitDurations = () => {
    if (splitMode === 'auto') {
      const half = totalHours / 2;
      return [`${half}h`, `${half}h`];
    }
    return customSplits.map(s => `${s}h`);
  };

  return (
    <LogContext.Provider value={{
      input, setInput,
      role, setRole,
      totalHours, setTotalHours,
      splitMode, setSplitMode,
      customSplits, setCustomSplits,
      tone, setTone,
      logs, setLogs,
      aiScore, setAiScore,
      loading, setLoading,
      getSplitDurations
    }}>
      {children}
    </LogContext.Provider>
  );
};
