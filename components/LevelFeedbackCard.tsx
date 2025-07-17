
import React from 'react';
import { LevelResult, ProcessAreaResult } from '../types';
import { SadRobotIcon, NeutralRobotIcon, HappyRobotIcon, ProcessAreaIcon } from './RobotIcons';

interface LevelFeedbackCardProps {
  levelResult: LevelResult;
}

const LevelFeedbackCard: React.FC<LevelFeedbackCardProps> = ({ levelResult }) => {
  const getOverallRobotIcon = (score: number): React.ReactNode => {
    if (score < 2.5) return <SadRobotIcon className="w-24 h-24 mx-auto mb-4 text-red-500" />;
    if (score < 3.5) return <NeutralRobotIcon className="w-24 h-24 mx-auto mb-4 text-yellow-500" />;
    return <HappyRobotIcon className="w-24 h-24 mx-auto mb-4 text-green-500" />;
  };
  
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">{levelResult.name}</h2>
      
      <div className="text-center mb-8">
        {getOverallRobotIcon(levelResult.overallScore)}
        <p className="text-lg text-slate-700 italic">{levelResult.overallFeedback}</p>
      </div>

      <h3 className="text-2xl font-semibold text-slate-700 mb-6 pt-6 border-t border-slate-200">Desglose por Área de Proceso:</h3>
      <div className="space-y-6">
        {levelResult.processAreaResults.map((paResult) => (
          <div key={paResult.id} className="bg-slate-50 p-6 rounded-lg shadow">
            <div className="flex items-center mb-3">
              <ProcessAreaIcon score={paResult.score} className="w-8 h-8 mr-3 flex-shrink-0" />
              <h4 className="text-xl font-semibold text-slate-800">{paResult.shortName} - {paResult.name}</h4>
            </div>
            <p className="text-md text-slate-600">
              <span className={`font-bold ${paResult.score < 2.5 ? 'text-red-600' : paResult.score < 3.5 ? 'text-yellow-600' : 'text-green-600'}`}>
                Puntuación: {paResult.score.toFixed(1)}/4.0
              </span>
            </p>
            <p className="mt-2 text-slate-600">{paResult.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelFeedbackCard;
