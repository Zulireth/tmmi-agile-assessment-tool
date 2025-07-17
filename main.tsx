import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AssessmentProvider } from './context/AssessmentContext'; // Asegúrate de importar el provider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AssessmentProvider>
      <App />
    </AssessmentProvider>
  </React.StrictMode>
);