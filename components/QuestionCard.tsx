import React from 'react';
import { Question, AnswerOption, AnswerOptionValue, UserAnswer } from '../types';
import { ANSWER_OPTIONS } from '../constants';

interface QuestionCardProps {
  question: Question;
  currentAnswer: AnswerOptionValue | null;
  onAnswerChange: (questionId: string, answer: AnswerOptionValue) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, currentAnswer, onAnswerChange }) => {
  if (!question.options || !Array.isArray(question.options)) {
    return <div className="text-red-500">Error: La pregunta no tiene opciones definidas.</div>;
  }

  return (
    <div className="mb-6">
      <p id={`question-${question.id}`} className="font-medium mb-2">{question.text}</p>
      <div role="radiogroup" aria-labelledby={`question-${question.id}`}>
        {question.options.map(option => (
          <label
            key={option.value}
            className={`block cursor-pointer rounded px-4 py-2 mb-2 border ${currentAnswer === option.value ? 'border-blue-600 bg-blue-50' : 'border-slate-300'}`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option.value}
              checked={currentAnswer === option.value}
              onChange={() => onAnswerChange(question.id, option.value)}
              className="mr-2"
              aria-checked={currentAnswer === option.value}
              aria-label={option.label}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
