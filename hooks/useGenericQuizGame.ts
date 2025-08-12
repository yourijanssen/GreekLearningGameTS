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
  userId: string; // NEW: User identifier for backend storage
  gameType: string; // NEW: Game type identifier for backend storage
  speechType: "number" | "alphabet";
}

export const useGenericQuizGame = (config: QuizGameConfig) => {
  const { data, userId, gameType, speechType } = config;
  const inputRef = useRef<HTMLInputElement>(null);

  // Use custom hook for game logic (uses backend persistence)
  const gameState = useQuizGame(data, userId, gameType);

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

  // Submit wrapper (for generic Element type compatibility)
  const handleSubmit = (e: React.FormEvent<Element>): void => {
    gameState.handleSubmit(e as React.FormEvent<HTMLFormElement>);
  };

  // Focus input on each new question
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
    handleSubmit,
  };
};
