// BaseQuizGame.tsx
import React from "react";
import { useGameLayout } from "@/hooks/useGameLayout";
import { GameComponentsFactory } from "./GameComponentFactory";

/**
 * Props for the BaseQuizGame component
 */
export interface BaseQuizGameProps {
  // Game state
  items: [string, string][];
  input: string;
  streak: number;
  bestStreak: number;
  correctCount: number;
  log: string[];
  
  // Timer state
  startTime: number | null;
  finishTime: number | null;
  
  // Handlers - FIXED: Use generic Element type to match QuizQuestionView
  handleSubmit: (e: React.FormEvent<Element>) => void;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMenu: () => void;
  handleListen: () => void;
  
  // Refs
  inputRef: React.RefObject<HTMLInputElement | null>;
  
  // Configuration
  data: [string, string][];
  questionPrompt: string;
  datasetTitle: string;
  firstColumnLabel: string;
  secondColumnLabel: string;
  buttonText: string;
}

/**
 * Extended props with layout information
 */
type ExtendedProps = BaseQuizGameProps & {
  isDesktop: boolean;
};

/**
 * Base quiz game component that handles layout and rendering
 */
export const BaseQuizGame: React.FC<BaseQuizGameProps> = (props) => {
  const { isDesktop, getContainerStyles, getMainContentStyles, getSidebarStyles } = useGameLayout();
  
  const extendedProps: ExtendedProps = { ...props, isDesktop };
  
  return (
    <>
      <div style={getContainerStyles()}>
        <main style={getMainContentStyles()}>
          {GameComponentsFactory.createMainContent(extendedProps)}
          {!isDesktop && GameComponentsFactory.createProgressTracker(extendedProps)}
        </main>

        {isDesktop && (
          <aside style={getSidebarStyles()}>
            {GameComponentsFactory.createProgressTracker(extendedProps)}
          </aside>
        )}
      </div>

      {GameComponentsFactory.createFloatingDataPeek(extendedProps)}
    </>
  );
};