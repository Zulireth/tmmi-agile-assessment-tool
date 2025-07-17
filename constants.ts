
import { TMMiLevel, AnswerOption, AnswerOptionValue, ProcessArea, Question, ProcessAreaResult } from './types';

const LEVEL2_ID = 'level2';

export const ANSWER_OPTIONS: AnswerOption[] = [
  { value: AnswerOptionValue.STRONGLY_AGREE, label: 'Totalmente de acuerdo', colorClass: 'bg-green-100 border-green-500' },
  { value: AnswerOptionValue.SLIGHTLY_AGREE, label: 'Ligeramente de acuerdo', colorClass: 'bg-lime-100 border-lime-500' },
  { value: AnswerOptionValue.SLIGHTLY_DISAGREE, label: 'Ligeramente en Desacuerdo', colorClass: 'bg-yellow-100 border-yellow-500' },
  { value: AnswerOptionValue.STRONGLY_DISAGREE, label: 'Muy en desacuerdo', colorClass: 'bg-red-100 border-red-500' },
  { value: AnswerOptionValue.NO_OPINION, label: 'Sin opinión/No sé', colorClass: 'bg-gray-100 border-gray-400' },
];

const PA_2_1_QUESTIONS: Question[] = [
  { 
    id: 'q2_1_1', 
    text: 'Como organización, nuestras metas y objetivos de pruebas están alineados con nuestras metas comerciales.', 
    processAreaId: 'pa2_1', 
    levelId: LEVEL2_ID,
    options: ANSWER_OPTIONS
  },
  { id: 'q2_1_2', text: 'Hemos establecido un enfoque organizacional, un marco o una estrategia sobre cómo se deben realizar las pruebas.', 
    processAreaId: 'pa2_1', 
    levelId: LEVEL2_ID,
    options: ANSWER_OPTIONS
  },
  { id: 'q2_1_3', 
    text: 'Somos capaces de medir el rendimiento de las pruebas frente a nuestros objetivos.',
    processAreaId: 'pa2_1', 
    levelId: LEVEL2_ID, 
    options: ANSWER_OPTIONS 
  },
  { id: 'q2_1_4', 
    text: 'Nuestra política de pruebas y estrategia de pruebas se comunican a todas las partes interesadas.', 
    processAreaId: 'pa2_1', 
    levelId: LEVEL2_ID, 
    options: ANSWER_OPTIONS 
  },
  { id: 'q2_1_5', 
    text: 'Nuestra política de pruebas y estrategia de pruebas se revisan periódicamente para garantizar su relevancia.', 
    processAreaId: 'pa2_1', 
    levelId: LEVEL2_ID, 
    options: ANSWER_OPTIONS 
  },
  { id: 'q2_1_6', 
    text: 'Nuestra política de pruebas y estrategia de pruebas se utilizan para informar la planificación de las pruebas.', 
    processAreaId: 'pa2_1', 
    levelId: LEVEL2_ID, 
    options: ANSWER_OPTIONS 
  },
  { id: 'q2_1_7', 
    text: 'Nuestra política de pruebas y estrategia de pruebas se utilizan para informar la ejecución de las pruebas.', 
    processAreaId: 'pa2_1', 
    levelId: LEVEL2_ID, 
    options: ANSWER_OPTIONS 
  },
  { id: 'q2_1_8', 
    text: 'Nuestra política de pruebas y estrategia de pruebas se utilizan para informar la supervisión y el control de las pruebas.', 
    processAreaId: 'pa2_1', 
    levelId: LEVEL2_ID, 
    options: ANSWER_OPTIONS 
  },
];

const PA_2_2_QUESTIONS: Question[] = [
  { id: 'q2_2_1', 
    text: 'Identificamos áreas críticas para la prueba evaluando y capturando los riesgos asociados con la entrega de cada parte de un producto.', 
    processAreaId: 'pa2_2', 
    levelId: LEVEL2_ID,
    options: ANSWER_OPTIONS 
},
  { id: 'q2_2_2', 
    text: 'Establecemos un enfoque para probar elementos y características en función de los riesgos identificados y los objetivos de calidad.',
    processAreaId:
    'pa2_2',
    levelId: LEVEL2_ID,
    options: ANSWER_OPTIONS
  },
  { id: 'q2_2_3', 
    text: 'La estimación del esfuerzo de prueba y los costos se incluyen en la actividad de estimación general.', 
    processAreaId: 'pa2_2', 
    levelId: LEVEL2_ID,
    options: ANSWER_OPTIONS
  },
  { id: 'q2_2_4', 
    text: 'Las actividades de prueba se planifican, gestionan activamente y se alinean con las actividades de desarrollo.',
    processAreaId: 'pa2_2',
    levelId: LEVEL2_ID,
    options: ANSWER_OPTIONS
  },
];

const PA_2_3_QUESTIONS: Question[] = [
  { id: 'q2_3_1', 
    text: 'El progreso y el desempeño de las pruebas se monitorean contra las metas y expectativas.', 
    processAreaId: 'pa2_3', 
    levelId: LEVEL2_ID, 
    options: ANSWER_OPTIONS 
  },
  { id: 'q2_3_2', 
    text: 'La calidad del producto se controla frente a las expectativas de calidad.', 
    processAreaId: 'pa2_3', 
    levelId: LEVEL2_ID,
    options: ANSWER_OPTIONS 
  },
  { id: 'q2_3_3', 
    text: 'Cuando el progreso de la prueba o la calidad del producto se desvía significativamente de las expectativas, tomamos medidas correctivas y las gestionamos hasta el cierre.', 
    processAreaId: 'pa2_3', 
    levelId: LEVEL2_ID,
    options: ANSWER_OPTIONS
  },
];

const PA_2_4_QUESTIONS: Question[] = [
  { id: 'q2_4_1', 
    text: 'Los incidentes de prueba se registran, analizan, gestionan y resuelven según corresponda.', 
    processAreaId: 'pa2_4', 
    levelId: LEVEL2_ID,
    options: ANSWER_OPTIONS
  },
  { id: 'q2_4_2', 
    text: 'Los scripts de prueba se producen y priorizan para su ejecución.', 
    processAreaId: 'pa2_4', 
    levelId: LEVEL2_ID,
    options: ANSWER_OPTIONS
  },
  { id: 'q2_4_3', 
    text: 'Las pruebas se ejecutan según su prioridad con los resultados y cualquier incidente registrado.', 
    processAreaId: 'pa2_4', 
    levelId: LEVEL2_ID,
    options: ANSWER_OPTIONS
  },
];

const PA_2_5_QUESTIONS: Question[] = [
  { id: 'q2_5_1', 
    text: 'Los entornos de prueba se crean y se ponen a disposición en el momento adecuado y con la configuración adecuada para su uso en la ejecución de la prueba. Se completan las pruebas de admisión/humo.', 
    processAreaId: 'pa2_5', 
    levelId: LEVEL2_ID,
    options: ANSWER_OPTIONS
  },
  { id: 'q2_5_2', 
    text: 'Para etapas posteriores, los entornos que no son de producción son lo más parecidos posible a la "vida real".', 
    processAreaId: 'pa2_5', 
    levelId: LEVEL2_ID,
    options: ANSWER_OPTIONS
  },
  { id: 'q2_5_3', 
    text: 'Las actividades en los entornos de prueba son visibles para todas las partes interesadas.', 
    processAreaId: 'pa2_5', 
    levelId: LEVEL2_ID,
    options: ANSWER_OPTIONS},
];


const LEVEL_2_PROCESS_AREAS: ProcessArea[] = [
  {
    id: 'pa2_1', name: 'Política y estrategia de prueba', shortName: '2.1', levelId: LEVEL2_ID, questions: PA_2_1_QUESTIONS,
    feedbackTemplate: (score: number) => {
      if (score < 2.5) return "Sus pruebas no están adecuadamente informadas por los objetivos comerciales y es posible que falte una política de prueba, una estrategia de prueba organizacional o medidas apropiadas de su rendimiento de prueba.";
      if (score < 3.5) return "Existe alguna alineación con los objetivos comerciales, pero la política y estrategia de prueba podrían fortalecerse para mejorar el rendimiento y la claridad.";
      return "Sus metas y objetivos de prueba están bien alineados con las metas comerciales, y cuenta con una política y estrategia de prueba efectivas y bien comunicadas.";
    },
  },
  {
    id: 'pa2_2', name: 'Planificación de la prueba', shortName: '2.2', levelId: LEVEL2_ID, questions: PA_2_2_QUESTIONS,
    feedbackTemplate: (score: number) => {
      if (score < 2.5) return "Su planificación de pruebas es generalmente efectiva, pero es posible que no considere adecuadamente el riesgo del producto o que no produzca un enfoque de prueba completo. Como resultado, pueden faltar estimaciones de prueba o ser inexactas.";
      if (score < 3.5) return "La planificación de pruebas considera los riesgos y establece un enfoque, aunque la estimación y la cobertura podrían ser más rigurosas.";
      return "Su planificación de pruebas es robusta, considerando adecuadamente los riesgos del producto, definiendo un enfoque claro y produciendo estimaciones precisas.";
    },
  },
  {
    id: 'pa2_3', name: 'Supervisión y control de pruebas', shortName: '2.3', levelId: LEVEL2_ID, questions: PA_2_3_QUESTIONS,
    feedbackTemplate: (score: number) => {
      if (score < 2.5) return "Su monitoreo y control de prueba no informa adecuadamente sobre el progreso de la prueba y la calidad del producto. No se abordan los problemas identificados.";
      if (score < 3.5) return "El progreso y la calidad se monitorean, pero la respuesta a las desviaciones y la gestión de problemas podrían ser más sistemáticas.";
      return "El monitoreo y control de sus pruebas informa efectivamente sobre el progreso y la calidad, y los problemas se gestionan activamente hasta su cierre.";
    },
  },
  {
    id: 'pa2_4', name: 'Diseño y ejecución de pruebas', shortName: '2.4', levelId: LEVEL2_ID, questions: PA_2_4_QUESTIONS,
    feedbackTemplate: (score: number) => {
      if (score < 2.5) return "Usted diseña, implementa y ejecuta pruebas, pero no siempre utilizando las técnicas de diseño de pruebas adecuadas. Es posible que los defectos no se gestionen hasta su resolución.";
      if (score < 3.5) return "Las pruebas se diseñan y ejecutan, pero la aplicación de técnicas de diseño podría ser más consistente y la gestión de defectos más formal.";
      return "Las pruebas se diseñan utilizando técnicas adecuadas, se implementan y ejecutan de manera efectiva, y los defectos se gestionan rigurosamente hasta su resolución.";
    },
  },
   {
    id: 'pa2_5', name: 'Entorno de prueba', shortName: '2.5', levelId: LEVEL2_ID, questions: PA_2_5_QUESTIONS,
    feedbackTemplate: (score: number) => {
      if (score < 2.5) return "Los requisitos del entorno de prueba se comprenden e implementan de manera deficiente. El uso del entorno de prueba no está sujeto a controles adecuados.";
      if (score < 3.5) return "Los entornos de prueba se establecen, pero su adecuación, parecido a producción y la visibilidad de su uso podrían mejorar.";
      return "Los entornos de prueba son adecuados, se gestionan bien, se asemejan a producción cuando es necesario y su uso es transparente para las partes interesadas.";
    },
  },
];

export const TMMI_LEVELS_DATA: TMMiLevel[] = [
  {
    id: LEVEL2_ID,
    name: 'Nivel 2 de TMMi - Gestionado',
    levelNumber: 2,
    processAreas: LEVEL_2_PROCESS_AREAS,
    overallFeedbackTemplate: (averageLevelScore: number, paScores: ProcessAreaResult[]): string => {
      const lowScoringPAs = paScores.filter(p => p.score < 2.5).map(p => p.name);
      let feedback = "";
      if (averageLevelScore < 2.5) {
        feedback = "TMMi Nivel 2 cubre los fundamentos clave de un conjunto de procesos de prueba. Sus procesos de prueba básicos parecen carecer de una serie de consideraciones clave y, como tal, la calidad de su producto puede verse comprometida.";
        if(lowScoringPAs.length > 0) {
          feedback += ` Áreas de especial preocupación incluyen: ${lowScoringPAs.join(', ')}.`;
        }
      } else if (averageLevelScore < 3.5) {
        feedback = "Su organización muestra fundamentos en los procesos de prueba de Nivel 2, pero hay áreas de mejora significativas para alcanzar una gestión de pruebas consistente y efectiva.";
         if(lowScoringPAs.length > 0) {
          feedback += ` Considere mejorar en: ${lowScoringPAs.join(', ')}.`;
        }
      } else {
        feedback = "Su organización demuestra una gestión de pruebas consistente y efectiva en todos los procesos clave de Nivel 2. Continúe manteniendo y refinando estos procesos para asegurar la calidad del producto.";
        if(lowScoringPAs.length > 0) {
          feedback += ` Áreas a vigilar: ${lowScoringPAs.join(', ')}.`;
        }
      }
      return feedback;
    },
  },
];
