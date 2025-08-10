import { stripGreekAccents } from "../utilities";

/**
 * Result of a quiz answer submission
 */
export interface QuizAnswerResult {
  isCorrect: boolean;
  isPerfectMatch?: boolean;
  feedbackMessage: string;
}

/**
 * Quiz game logic utilities
 */
export class QuizLogicManager {
  /**
   * Evaluates a quiz answer and returns the result
   *
   * @param {string} userAnswer - The user's submitted answer
   * @param {string} correctAnswer - The correct answer
   * @param {string} questionContext - Context for feedback (e.g., English number)
   * @param {number} currentStreak - The current streak count
   * @returns {QuizAnswerResult} The evaluation result
   */
  static evaluateAnswer(
    userAnswer: string,
    correctAnswer: string,
    questionContext: string,
    currentStreak: number
  ): QuizAnswerResult {
    const normalizedInput = stripGreekAccents(userAnswer).toLowerCase();
    const normalizedAnswer = stripGreekAccents(correctAnswer).toLowerCase();

    if (normalizedInput === normalizedAnswer) {
      const isPerfectMatch = userAnswer === correctAnswer;
      const newStreak = currentStreak + 1;

      return {
        isCorrect: true,
        isPerfectMatch,
        feedbackMessage: isPerfectMatch
          ? `✅ Correct! Answer: ${correctAnswer} (${questionContext}). Streak: ${newStreak}`
          : `✅ Correct! Answer: ${correctAnswer} (${questionContext}). The proper way is: ${correctAnswer}`,
      };
    } else {
      return {
        isCorrect: false,
        feedbackMessage: `❌ Incorrect! Your answer: "${userAnswer}". Correct answer: ${correctAnswer} (${questionContext}). Your streak was: ${currentStreak}`,
      };
    }
  }

  /**
   * Updates game state after a correct answer
   *
   * @param {Object} state - Current game state
   * @param {[string, string][]} state.items - Current quiz items
   * @param {number} state.streak - Current streak
   * @param {number} state.bestStreak - Best streak so far
   * @param {number} state.correctCount - Number of correct answers
   * @param {string[]} state.log - Feedback log
   * @param {string} feedbackMessage - Message to add to log
   * @returns {Object} Updated game state
   */
  static handleCorrectAnswer(
    state: {
      items: [string, string][];
      streak: number;
      bestStreak: number;
      correctCount: number;
      log: string[];
    },
    feedbackMessage: string
  ) {
    const newStreak = state.streak + 1;

    return {
      items: state.items.slice(1),
      streak: newStreak,
      bestStreak: Math.max(state.bestStreak, newStreak),
      correctCount: state.correctCount + 1,
      log: [feedbackMessage, ...state.log],
    };
  }

  /**
   * Updates game state after an incorrect answer
   *
   * @param {Object} state - Current game state
   * @param {[string, string][]} state.items - Current quiz items
   * @param {number} state.streak - Current streak
   * @param {number} state.bestStreak - Best streak so far
   * @param {string[]} state.log - Feedback log
   * @param {string} feedbackMessage - Message to add to log
   * @returns {Object} Updated game state
   */
  static handleIncorrectAnswer(
    state: {
      items: [string, string][];
      streak: number;
      bestStreak: number;
      log: string[];
    },
    feedbackMessage: string
  ) {
    const wrongItem = state.items[0];

    return {
      items: [...state.items.slice(1), wrongItem],
      streak: 0,
      bestStreak: Math.max(state.bestStreak, state.streak),
      log: [feedbackMessage, ...state.log],
    };
  }
}
