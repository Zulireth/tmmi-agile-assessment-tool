import { TMMiLevel, UserAnswer, AnswerOptionValue, LevelResult, ProcessAreaResult } from '../types';

export class AssessmentCalculator {
  private levels: TMMiLevel[];
  private answers: UserAnswer[];

  constructor(levels: TMMiLevel[], answers: UserAnswer[]) {
    this.levels = levels;
    this.answers = answers;
  }

  public calculateResults(): LevelResult[] {
    return this.levels.map(level => {
      const processAreaResults: ProcessAreaResult[] = level.processAreas.map(pa => {
        const paQuestions = pa.questions;
        const paAnswers = this.answers.filter(
          ans =>
            paQuestions.some(q => q.id === ans.questionId) &&
            ans.answer !== AnswerOptionValue.NO_OPINION &&
            ans.answer !== null
        );

        let scoreSum = 0;
        paAnswers.forEach(ans => {
          scoreSum += ans.answer!;
        });

        const averageScore = paAnswers.length > 0 ? scoreSum / paAnswers.length : 0;
        return {
          id: pa.id,
          name: pa.name,
          shortName: pa.shortName,
          score: averageScore,
          feedback: pa.feedbackTemplate(averageScore),
        };
      });

      const validPaScores = processAreaResults.filter(par => par.score > 0);
      const overallLevelScore =
        validPaScores.length > 0
          ? validPaScores.reduce((acc, curr) => acc + curr.score, 0) / validPaScores.length
          : 0;

      return {
        id: level.id,
        name: level.name,
        overallScore: overallLevelScore,
        overallFeedback: level.overallFeedbackTemplate(overallLevelScore, processAreaResults),
        processAreaResults: processAreaResults,
      };
    });
  }
}