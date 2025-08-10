import { useRef, useEffect } from "react";
import { useAutoNavigation } from "./useAutoNavigation";
import { useGameTimer } from "./useGameTimer";
import { useSpeechSynthesis } from "./useSpeechSynthesis";
import { useQuizGame } from "./useQuizGame";
import { DOMUtils } from "@/lib/utils/gameUtilities/domUtils";
import { SpeechUtils } from "@/lib/utils/gameUtilities/speechUtlis";

/**
 * Configuration for generic quiz game
 */
export interface QuizGameConfig {
  data: [string, string][];
  storageKey: string;
  speechType: "number" | "alphabet";
}
// hooks/useGenericQuizGame.ts
export const useGenericQuizGame = (config: QuizGameConfig) => {
  const { data, storageKey, speechType } = config;
  const inputRef = useRef<HTMLInputElement>(null);

  // Use custom hook for game logic
  const gameState = useQuizGame(data, storageKey);

  // Custom hooks
  const { startTime, finishTime } = useGameTimer(gameState.items.length === 0);
  const { speak } = useSpeechSynthesis();

  /**
   * Handles text-to-speech for the current question
   */
  const handleListen = (): void => {
    if (gameState.items.length > 0) {
      const [answer, question] = gameState.items[0];
      const speechText =
        speechType === "alphabet"
          ? SpeechUtils.getAlphabetSpeechText(answer, question)
          : SpeechUtils.getNumberSpeechText(answer);
      speak(speechText);
    }
  };

  /**
   * Handles navigation back to main menu
   */
  const handleMenu = (): void => {
    DOMUtils.navigateTo("/");
  };

  // FIXED: Update handleSubmit to use generic Element type
  const handleSubmit = (e: React.FormEvent<Element>): void => {
    // Cast to more specific type if needed for the actual implementation
    gameState.handleSubmit(e as React.FormEvent<HTMLFormElement>);
  };

  // Focus input on question change
  useEffect(() => {
    DOMUtils.focusAndSelectInput(inputRef);
  }, [gameState.items.length]);

  // Auto-navigation when game is complete
  useAutoNavigation(gameState.items.length === 0, finishTime);

  return {
    ...gameState,
    inputRef,
    startTime,
    finishTime,
    handleListen,
    handleMenu,
    handleSubmit, // Use the wrapper function with correct type
  };
};
