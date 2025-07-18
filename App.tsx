import React, { useState, useEffect } from 'react';
import { TMMI_LEVELS_DATA, ANSWER_OPTIONS } from './constants';
import { TMMiLevel, ProcessArea, Question, UserAnswer, AnswerOptionValue, LevelResult, ProcessAreaResult } from './types';
import QuestionCard from './components/QuestionCard';
import LevelFeedbackCard from './components/LevelFeedbackCard';
import ProgressBar from './components/ProgressBar';
import { AssessmentCalculator } from './utils/AssessmentCalculator';

function App() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentPAIndex, setCurrentPAIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [levelResults, setLevelResults] = useState<LevelResult[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  // For now, we only have Level 2 data
  const currentLevelData: TMMiLevel | undefined = TMMI_LEVELS_DATA[currentLevelIndex];
  const currentPAData: ProcessArea | undefined = currentLevelData?.processAreas[currentPAIndex];

  const totalPAsInCurrentLevel = currentLevelData?.processAreas.length || 0;
  const totalPAsAcrossAllLevels = TMMI_LEVELS_DATA.reduce((sum, level) => sum + level.processAreas.length, 0); // Simplified for single level for now

  useEffect(() => {
    // Initialize answers
    const initialAnswers: UserAnswer[] = [];
    TMMI_LEVELS_DATA.forEach(level => {
      level.processAreas.forEach(pa => {
        pa.questions.forEach(q => {
          initialAnswers.push({ questionId: q.id, answer: null });
        });
      });
    });
    setAnswers(initialAnswers);
  }, []);

  const handleAnswerChange = (questionId: string, answerValue: AnswerOptionValue) => {
    setAnswers(prevAnswers => prevAnswers.map(ans => ans.questionId === questionId ? { ...ans, answer: answerValue } : ans
    )
    );
  };

// Nueva funciónpara guardar resultados en el backend
  // Esta función se llamará al finalizar la evaluación para enviar las respuestas y resultados al backend

const handleSaveResults = async (userAnswers: UserAnswer[], results: LevelResult[]) => {
    // La URL de tu API local que está corriendo en la otra terminal
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

    // Para el backend, enviaremos las respuestas del usuario y los resultados calculados.
    const payload = {
      answers: userAnswers,
      feedback: results
    };

    console.log('Enviando los siguientes datos al backend:', payload);

    try {
        const response = await fetch(`${apiUrl}/responses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'La respuesta del servidor no fue OK');
        }

        const result = await response.json();
        console.log('¡Éxito! Respuesta del backend:', result);
        // Podemos mostrar una notificación más sutil en lugar de un alert
        // por ejemplo, usando una librería como react-toastify
        alert('Resultados guardados en la base de datos.');

    } catch (error) {
        console.error('Error al guardar los resultados en el backend:', error);
        alert('Hubo un error al guardar tus resultados. Por favor, revisa la consola.');
    }
};

  const calculateResults = () => {
    const calculator = new AssessmentCalculator(TMMI_LEVELS_DATA, answers);
    const results = calculator.calculateResults();
    setLevelResults(results);
    setShowResults(true);

    // ¡AQUÍ ESTÁ LA MAGIA!
    // Llamamos a nuestra nueva función para guardar todo en la base de datos.
    handleSaveResults(answers, results);
  };

  const handleNext = () => {
    if (!currentLevelData || !currentPAData) return;

    // Validar que todas las preguntas del área de proceso actual estén respondidas
    const unanswered = currentPAData.questions.some(
      q => !answers.find(ans => ans.questionId === q.id && ans.answer !== null)
    );
    if (unanswered) {
      setValidationError('Por favor responde todas las preguntas antes de continuar.');
      return;
    }
    setValidationError(null);

    if (currentPAIndex < currentLevelData.processAreas.length - 1) {
      setCurrentPAIndex(currentPAIndex + 1);
    } else {
      if (currentLevelIndex === TMMI_LEVELS_DATA.length - 1) {
        calculateResults();
      }
    }
  };

  // En el render, muestra el error si existe
  {
    validationError && (
      <div className="text-red-600 text-center mt-4" role="alert">{validationError}</div>
    );
  }

  function handlePrev() {
    if (currentPAIndex > 0) {
      setCurrentPAIndex(currentPAIndex - 1);
    } else {
      // Potentially move to prev level if implemented
      // if (currentLevelIndex > 0) {
      //   setCurrentLevelIndex(currentLevelIndex - 1);
      //   const prevLevel = TMMI_LEVELS_DATA[currentLevelIndex - 1];
      //   setCurrentPAIndex(prevLevel.processAreas.length - 1);
      // }
    }
  }

  const restartSurvey = () => {
    setCurrentLevelIndex(0);
    setCurrentPAIndex(0);
    setShowResults(false);
    setLevelResults([]);
    // Re-initialize answers
    const initialAnswers: UserAnswer[] = [];
    TMMI_LEVELS_DATA.forEach(level => {
      level.processAreas.forEach(pa => {
        pa.questions.forEach(q => {
          initialAnswers.push({ questionId: q.id, answer: null });
        });
      });
    });
    setAnswers(initialAnswers);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-slate-100 py-8 px-4">
        <header className="bg-slate-800 text-white py-6 shadow-lg mb-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center">Resultados de la Evaluación TMMi Ágil</h1>
          </div>
        </header>
        <main className="container mx-auto max-w-4xl">
          {levelResults.map(lr => <LevelFeedbackCard key={lr.id} levelResult={lr} />)}
          <div className="text-center mt-12 flex justify-center gap-4">
    <button onClick={restartSurvey} className="bg-slate-500 ...">
      Reiniciar Evaluación
    </button>
    <button onClick={() => handleSaveResults(answers, levelResults)} className="bg-blue-600 ...">
      Guardar Resultados
    </button>
</div>
        </main>
      </div>
    );
  }

  if (!currentLevelData || !currentPAData) {
    return <div className="p-8 text-center text-red-500">Error: No se pudieron cargar los datos de la evaluación.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <header className="bg-slate-800 text-white py-6 shadow-lg mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Herramienta de Evaluación TMMi Ágil</h1>
        </div>
      </header>
      <main className="container mx-auto max-w-2xl">
        <ProgressBar currentStep={currentPAIndex + 1} totalSteps={totalPAsInCurrentLevel} />

        <div className="bg-white shadow-xl rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-slate-700 mb-2">
            {currentLevelData.name}
          </h2>
          <h3 className="text-xl font-medium text-blue-600 mb-6">
            Área de Proceso: {currentPAData.shortName} - {currentPAData.name}
          </h3>

          {currentPAData.questions.map(q => (
            <QuestionCard
              key={q.id}
              question={q}
              currentAnswer={answers.find(ans => ans.questionId === q.id)?.answer || null}
              onAnswerChange={handleAnswerChange} />
          ))}

          {/* En el render, muestra el error si existe */}
          {validationError && (
            <div className="text-red-600 text-center mt-4">{validationError}</div>
          )}
        </div>

        <div className="flex justify-between mt-10">
          <button
            onClick={handlePrev}
            disabled={currentPAIndex === 0 && currentLevelIndex === 0} // Simplified for single level
            className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            Anterior
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {currentPAIndex === totalPAsInCurrentLevel - 1 ? 'Ver Resultados' : 'Siguiente'}
          </button>
        </div>
      </main>
      <footer className="text-center text-sm text-slate-500 py-8 mt-12">
        Basado en "TMMi en el contexto Ágil" - Versión 1.4, Fundación TMMi.
      </footer>
    </div>
  );
}

export default App;
