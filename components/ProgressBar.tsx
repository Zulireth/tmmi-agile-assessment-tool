
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const percentage = totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0;

  return (
    <div className="w-full bg-slate-200 rounded-full h-4 mb-8 shadow-inner">
      <div
        className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out_ text-xs font-medium text-blue-100 text-center p-0.5 leading-none"
        style={{ width: `${percentage}%` }}
      >
       {percentage > 5 ? `${percentage}%` : ''}
      </div>
    </div>
  );
};

export default ProgressBar;
