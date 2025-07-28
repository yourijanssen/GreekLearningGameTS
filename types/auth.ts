// authTypes.ts
export type LanguageOption = "english" | "dutch";

export interface LanguageSettings {
  selectedLanguage: LanguageOption;
  setSelectedLanguage: (lang: LanguageOption) => void;
}
