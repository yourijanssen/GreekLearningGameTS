export class StorageService {
  private static readonly NUMBERS_GAME_KEY = "numbersGameState";

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
}
