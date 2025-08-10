/**
 * Speech synthesis utilities for quiz games
 */
export class SpeechUtils {
  /**
   * Determines appropriate speech text for Greek alphabet games
   * Speaks the Greek letter if question is in English, otherwise speaks the question
   *
   * @param {string} answer - The correct answer (Greek letter)
   * @param {string} question - The question text
   * @returns {string} Text that should be spoken
   */
  static getAlphabetSpeechText(answer: string, question: string): string {
    return /[a-zA-Z]/.test(question) ? answer : question;
  }

  /**
   * Gets speech text for number games (always speak the answer)
   *
   * @param {string} answer - The Greek number word
   * @returns {string} Text that should be spoken
   */
  static getNumberSpeechText(answer: string): string {
    return answer;
  }
}
