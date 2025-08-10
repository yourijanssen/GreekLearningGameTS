import { useState, useEffect } from "react";

interface KeyboardLanguage {
  code: string;
  name: string;
  nativeName: string;
  isGreek: boolean;
}

/**
 * Custom hook for detecting keyboard language
 *
 * @returns {Object} Keyboard language information and detection state
 */
export const useKeyboardLanguage = () => {
  const [keyboardLanguage, setKeyboardLanguage] =
    useState<KeyboardLanguage | null>(null);
  const [lastKeyPressed, setLastKeyPressed] = useState<string>("");
  const [isDetecting, setIsDetecting] = useState<boolean>(false);

  const languageMap: Record<string, Omit<KeyboardLanguage, "isGreek">> = {
    en: { code: "en", name: "English", nativeName: "English" },
    el: { code: "el", name: "Greek", nativeName: "Ελληνικά" },
    de: { code: "de", name: "German", nativeName: "Deutsch" },
    fr: { code: "fr", name: "French", nativeName: "Français" },
  };

  const detectGreekInput = (char: string): boolean => {
    return /[\u0370-\u03FF\u1F00-\u1FFF]/.test(char);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const char = event.key;

    if (char.length === 1 && char !== " ") {
      setLastKeyPressed(char);
      setIsDetecting(true);

      const isGreek = detectGreekInput(char);

      if (isGreek) {
        setKeyboardLanguage({
          ...languageMap["el"],
          isGreek: true,
        });
      } else if (/[a-zA-Z]/.test(char)) {
        const browserLang = navigator.language.split("-")[0];
        const lang = languageMap[browserLang] || languageMap["en"];
        setKeyboardLanguage({
          ...lang,
          isGreek: false,
        });
      }

      setTimeout(() => setIsDetecting(false), 100);
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, []);

  return {
    keyboardLanguage,
    lastKeyPressed,
    isDetecting,
    isGreekKeyboard: keyboardLanguage?.isGreek || false,
  };
};
