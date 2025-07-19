import { greekNumbers } from "./data/greekNumbers";
import { normalizeGreekCase, shuffleArray, stripGreekAccents } from "./utils/utilities";

/**
 * Class representing the core logic and state of a Greek alphabet quiz game.
 */
export class GreekQuizGame {
  private quizItems: [string, string][];
  private userInput: string;
  private currentFeedback: string | null;
  private currentStreak: number;
  private highestStreak: number;
  private correctAnswers: number;
  private gameStartTime: number | null;
  private gameFinishTime: number | null;
  private feedbackHistory: string[];

  constructor() {
    this.quizItems = shuffleArray([...greekNumbers]);
    this.userInput = "";
    this.currentFeedback = null;
    this.currentStreak = 0;
    this.highestStreak = 0;
    this.correctAnswers = 0;
    this.gameStartTime = null;
    this.gameFinishTime = null;
    this.feedbackHistory = [];
  }

  // Getters for state access
  public getQuizItems(): [string, string][] {
    return this.quizItems;
  }

  public getUserInput(): string {
    return this.userInput;
  }

  public getCurrentFeedback(): string | null {
    return this.currentFeedback;
  }

  public getFeedbackColor(): string {
    return this.currentFeedback && this.currentFeedback.startsWith("✅")
      ? "#047c2a"
      : this.currentFeedback
      ? "#c43219"
      : "";
  }

  public getCurrentStreak(): number {
    return this.currentStreak;
  }

  public getHighestStreak(): number {
    return this.highestStreak;
  }

  public getCorrectAnswers(): number {
    return this.correctAnswers;
  }

  public getTotalItems(): number {
    return greekNumbers.length;
  }

  public getGameStartTime(): number | null {
    return this.gameStartTime;
  }

  public getGameFinishTime(): number | null {
    return this.gameFinishTime;
  }

  public getFeedbackHistory(): string[] {
    return this.feedbackHistory;
  }

  public isGameComplete(): boolean {
    return this.quizItems.length === 0;
  }

  // Methods to update state
  public initializeGame(): void {
    this.gameStartTime = Date.now();
  }

  public updateGameFinishTime(): void {
    if (this.quizItems.length === 0 && this.gameFinishTime === null) {
      this.gameFinishTime = Date.now();
    }
  }

  /**
   * Updates the user input with normalized Greek text.
   * @param input - The raw input from the user.
   */
  public setUserInput(input: string): void {
    this.userInput = normalizeGreekCase(input);
  }

  /**
   * Processes the user's answer submission and updates game state.
   */
  public submitAnswer(): void {
    if (this.quizItems.length === 0) return;

    const [letter, name] = this.quizItems[0];
    const normalizedInput = stripGreekAccents(this.userInput);
    const normalizedLetter = stripGreekAccents(letter);

    if (normalizedInput === normalizedLetter) {
      const isPerfectMatch = this.userInput === letter;
      const newStreak = this.currentStreak + 1;
      this.currentStreak = newStreak;
      this.correctAnswers += 1;
      this.highestStreak = Math.max(this.highestStreak, newStreak);
      this.quizItems = shuffleArray(this.quizItems.slice(1));
      const feedbackMsg = isPerfectMatch
        ? `✅ Correct! Streak: ${newStreak}`
        : `✅ Correct! The proper way is: ${letter}`;
      this.feedbackHistory = [feedbackMsg, ...this.feedbackHistory];
      this.userInput = "";
      this.currentFeedback = feedbackMsg;
    } else {
      const feedbackMsg = `❌ Incorrect! The correct answer was: ${letter} (${name}). Your streak was: ${this.currentStreak}`;
      this.feedbackHistory = [feedbackMsg, ...this.feedbackHistory];
      this.highestStreak = Math.max(this.highestStreak, this.currentStreak);
      this.currentStreak = 0;
      this.quizItems = shuffleArray([...this.quizItems]);
      this.userInput = "";
      this.currentFeedback = feedbackMsg;
    }
  }

  /**
   * Plays the pronunciation of the current Greek letter using text-to-speech.
   */
  public playPronunciation(): void {
    if (this.quizItems.length === 0) return;
    const letterToRead = this.quizItems[0][0];
    const utterance = new window.SpeechSynthesisUtterance(letterToRead);
    const voices = window.speechSynthesis.getVoices();
    const greekVoice = voices.find((v) => v.lang && v.lang.startsWith("el"));
    if (greekVoice) utterance.voice = greekVoice;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
}