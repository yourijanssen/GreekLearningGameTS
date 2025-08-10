/**
 * Interface for basic game state that can be persisted to localStorage
 */
export interface BaseGameState {
  remainingItems: [string, string][];
  streak: number;
  bestStreak: number;
  correctCount: number;
  log: string[];
}

/**
 * Game state management utilities for quiz games
 */
export class GameStateManager {
  /**
   * Loads saved game state from localStorage
   *
   * @param {string} storageKey - The localStorage key to load from
   * @returns {BaseGameState | null} The loaded game state or null if not found
   */
  static loadGameState(storageKey: string): BaseGameState | null {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return null;

    try {
      const parsed: BaseGameState = JSON.parse(saved);
      if (parsed.remainingItems?.length) {
        return {
          remainingItems: parsed.remainingItems,
          streak: parsed.streak || 0,
          bestStreak: parsed.bestStreak || 0,
          correctCount: parsed.correctCount || 0,
          log: parsed.log || [],
        };
      }
    } catch (err) {
      console.warn(`Failed to load saved game state from ${storageKey}:`, err);
    }
    return null;
  }

  /**
   * Persists game state to localStorage
   *
   * @param {string} storageKey - The localStorage key to save to
   * @param {BaseGameState} gameState - The game state to save
   */
  static saveGameState(storageKey: string, gameState: BaseGameState): void {
    try {
      localStorage.setItem(storageKey, JSON.stringify(gameState));
    } catch (err) {
      console.warn(`Failed to save game state to ${storageKey}:`, err);
    }
  }

  /**
   * Clears game state from localStorage
   *
   * @param {string} storageKey - The localStorage key to clear
   */
  static clearGameState(storageKey: string): void {
    localStorage.removeItem(storageKey);
  }
}
