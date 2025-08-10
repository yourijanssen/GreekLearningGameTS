export class StorageService {
  private static readonly NUMBERS_GAME_KEY = "numbersGameState";
  private static readonly NAMES_GAME_KEY = "namesGameState";

  // Add more game storage keys as you create them
  private static readonly GAME_STORAGE_KEYS = [
    "numbersGameState",
    "namesGameState",
    "alphabetGameState",
    "weekdaysGameState",
    "vocabularyGameState",
    "toBeGameState",
    "phrasesGameState",
    "verbsGameState",
    "adjectivesGameState",
    "sentencesGameState",
    // Add any other game keys you have
  ];

  static checkForSavedGame(): boolean {
    try {
      const saved = localStorage.getItem(this.NUMBERS_GAME_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.remainingItems?.length > 0;
      }
      return false;
    } catch (error) {
      console.warn("Failed to parse saved game state:", error);
      return false;
    }
  }

  static saveLanguagePreference(language: string): void {
    try {
      localStorage.setItem("selectedLanguage", language);
    } catch (error) {
      console.warn("Failed to save language preference:", error);
    }
  }

  static getLanguagePreference(): string | null {
    try {
      return localStorage.getItem("selectedLanguage");
    } catch (error) {
      console.warn("Failed to get language preference:", error);
      return null;
    }
  }

  // NEW: Clear all game states
  static clearAllGameStates(): void {
    try {
      this.GAME_STORAGE_KEYS.forEach((key) => {
        localStorage.removeItem(key);
      });
      console.log("All game states cleared successfully");
    } catch (error) {
      console.error("Failed to clear game states:", error);
      throw error;
    }
  }

  // NEW: Check if any game states exist
  static hasAnyGameState(): boolean {
    try {
      return this.GAME_STORAGE_KEYS.some((key) => {
        const saved = localStorage.getItem(key);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            return parsed && Object.keys(parsed).length > 0;
          } catch {
            return false;
          }
        }
        return false;
      });
    } catch (error) {
      console.warn("Failed to check for game states:", error);
      return false;
    }
  }

  // NEW: Get summary of saved games
  static getSavedGamesSummary(): { [key: string]: boolean } {
    const summary: { [key: string]: boolean } = {};

    try {
      this.GAME_STORAGE_KEYS.forEach((key) => {
        const saved = localStorage.getItem(key);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            summary[key] = parsed && Object.keys(parsed).length > 0;
          } catch {
            summary[key] = false;
          }
        } else {
          summary[key] = false;
        }
      });
    } catch (error) {
      console.warn("Failed to get saved games summary:", error);
    }

    return summary;
  }
}
