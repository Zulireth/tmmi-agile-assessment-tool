import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserAnswer, LevelResult } from '../types';

interface AssessmentContextProps {
  answers: UserAnswer[];
  setAnswers: React.Dispatch<React.SetStateAction<UserAnswer[]>>;
  levelResults: LevelResult[];
  setLevelResults: React.Dispatch<React.SetStateAction<LevelResult[]>>;
}

const AssessmentContext = createContext<AssessmentContextProps | undefined>(undefined);

export const AssessmentProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [levelResults, setLevelResults] = useState<LevelResult[]>([]);

  return (
    <AssessmentContext.Provider value={{ answers, setAnswers, levelResults, setLevelResults }}>
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) throw new Error('useAssessment must be used within AssessmentProvider');
  return context;
};