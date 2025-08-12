/* eslint-disable @typescript-eslint/no-explicit-any */
// services/StorageService.ts

const API_URL =
  process.env.API_URL ||
  "http://localhost:8080" ||
  "https://express-vercel-deployment-ashen.vercel.app";

interface GameState {
  [key: string]: any;
  remainingItems?: any[];
}

export class StorageService {
  private static readonly GAME_TYPES = {
    NUMBERS: "numbersGame",
    NAMES: "namesGame",
    ALPHABET: "alphabetGame",
    WEEKDAYS: "weekdaysGame",
    VOCABULARY: "vocabularyGame",
    TO_BE: "toBeGame",
    PHRASES: "phrasesGame",
    VERBS: "verbsGame",
    ADJECTIVES: "adjectivesGame",
    SENTENCES: "sentencesGame",
  };

  // Helper to get current user ID from localStorage (set during login)
  private static getCurrentUserId(): string | null {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        return parsed.id;
      } catch {
        return null;
      }
    }
    return null;
  }

  // Save game state to database
  static async saveGameState(
    gameType: string,
    gameState: GameState
  ): Promise<boolean> {
    try {
      const userId = this.getCurrentUserId();
      if (!userId) {
        console.warn("No user logged in, cannot save game state");
        return false;
      }

      const response = await fetch(`${API_URL}/saveGameState`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          gameType,
          gameState,
        }),
      });

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error("Failed to save game state:", error);
      return false;
    }
  }

  // Get game state from database
  static async getGameState(gameType: string): Promise<GameState | null> {
    try {
      const userId = this.getCurrentUserId();
      if (!userId) {
        console.warn("No user logged in, cannot get game state");
        return null;
      }

      const response = await fetch(
        `${API_URL}/getGameState/${userId}/${gameType}`
      );
      const data = await response.json();

      if (data.success && data.gameState) {
        return data.gameState;
      }
      return null;
    } catch (error) {
      console.error("Failed to get game state:", error);
      return null;
    }
  }

  // Check for saved numbers game (keeping for backward compatibility)
  static async checkForSavedGame(): Promise<boolean> {
    try {
      const gameState = await this.getGameState(this.GAME_TYPES.NUMBERS);
      return gameState?.remainingItems?.length > 0 || false;
    } catch (error) {
      console.warn("Failed to check for saved game:", error);
      return false;
    }
  }

  // Clear specific game state
  static async clearGameState(gameType: string): Promise<boolean> {
    try {
      const userId = this.getCurrentUserId();
      if (!userId) {
        console.warn("No user logged in, cannot clear game state");
        return false;
      }

      const response = await fetch(
        `${API_URL}/clearGameState/${userId}/${gameType}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error("Failed to clear game state:", error);
      return false;
    }
  }

  // Clear all game states
  static async clearAllGameStates(): Promise<void> {
    try {
      const userId = this.getCurrentUserId();
      if (!userId) {
        console.warn("No user logged in, cannot clear game states");
        return;
      }

      const response = await fetch(`${API_URL}/clearAllGameStates/${userId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        console.log("All game states cleared successfully");
      }
    } catch (error) {
      console.error("Failed to clear all game states:", error);
      throw error;
    }
  }

  // Check if any game states exist
  static async hasAnyGameState(): Promise<boolean> {
    try {
      const userId = this.getCurrentUserId();
      if (!userId) return false;

      // Check each game type
      for (const gameType of Object.values(this.GAME_TYPES)) {
        const gameState = await this.getGameState(gameType);
        if (gameState && Object.keys(gameState).length > 0) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.warn("Failed to check for game states:", error);
      return false;
    }
  }
}
