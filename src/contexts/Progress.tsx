import React, { useState, createContext } from 'react';


interface IProgressProps{
  inProgress: boolean;
  spinner: {
      start: () => void;
      stop: () => void;
  };
}

const ProgressContext = createContext<IProgressProps>({
  inProgress: false,
  spinner: {
    start: () => {},
    stop: () => {}
  },
});


const ProgressProvder: React.FC<{}> = ({ children }) => {
  const [inProgress, setInpProgress] = useState(false);
  const spinner = {
    start: () => setInpProgress(true),
    stop: () => setInpProgress(false),
  };

  const value = { inProgress, spinner };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export { ProgressContext, ProgressProvder };