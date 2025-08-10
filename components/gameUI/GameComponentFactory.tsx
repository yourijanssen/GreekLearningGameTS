import React from "react";
import FeedbackLog from "./FeedbackHistory";
import GameOver from "./GameOver";
import { QuizQuestionView } from "./quizQuestionView";
import DataPeekButton from "./DataPeekButton";
import GameProgressTrackerWithKeyboard from "./GameProgressTrackerWithKeyboard";

// GameComponentsFactory.tsx
export interface GameComponentsFactoryProps {
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
  
  // Handlers - FIXED: Use generic Element type
  handleSubmit: (e: React.FormEvent<Element>) => void;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMenu: () => void;
  handleListen: () => void;
  
  // Configuration
  inputRef: React.RefObject<HTMLInputElement | null>;
  data: [string, string][];
  questionPrompt: string;
  datasetTitle: string;
  firstColumnLabel: string;
  secondColumnLabel: string;
  buttonText: string;
  
  // Layout
  isDesktop: boolean;
}

/**
 * Factory for creating standardized game components
 */
export class GameComponentsFactory {
  /**
   * Creates the main content section
   */
  static createMainContent(props: GameComponentsFactoryProps): React.ReactElement {
    const {
      items,
      input,
      handleSubmit,
      handleInput,
      handleMenu,
      handleListen,
      inputRef,
      data,
      questionPrompt,
      datasetTitle,
      firstColumnLabel,
      secondColumnLabel,
      buttonText,
      log,
    } = props;

    return (
      <>
        {items.length === 0 ? (
          <GameOver onMenu={handleMenu} />
        ) : (
          <>
            <QuizQuestionView
              questionPrompt={questionPrompt}
              question={items[0][1]}
              input={input}
              onInput={handleInput}
              onSubmit={handleSubmit}
              inputRef={inputRef}
              disabled={false}
              onMenu={handleMenu}
              onListen={handleListen}
              feedback={null}
              feedbackColor=""
            />
            
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <DataPeekButton
                data={data}
                buttonText={buttonText}
                modalTitle={datasetTitle}
                firstColumnLabel={firstColumnLabel}
                secondColumnLabel={secondColumnLabel}
                position="inline"
                style={{
                  fontSize: "0.8rem",
                  padding: "0.4rem 0.8rem",
                }}
              />
            </div>
          </>
        )}
        
        <FeedbackLog log={log} />
      </>
    );
  }

  /**
   * Creates the progress tracker component
   */
  static createProgressTracker(props: GameComponentsFactoryProps): React.ReactElement {
    const {
      streak,
      bestStreak,
      correctCount,
      data,
      startTime,
      finishTime,
      isDesktop,
    } = props;

    return (
      <GameProgressTrackerWithKeyboard
        streak={streak}
        bestStreak={bestStreak}
        correctCount={correctCount}
        total={data.length}
        startTime={startTime}
        finishTime={finishTime}
        streakLabel="Current Streak"
        bestStreakLabel="Top Streak"
        progressLabel="Completed"
        timeLabel="Time Taken"
        sidebarMode={isDesktop}
      />
    );
  }

  /**
   * Creates the floating data peek button for mobile
   */
  static createFloatingDataPeek(props: GameComponentsFactoryProps): React.ReactElement | null {
    const {
      isDesktop,
      items,
      data,
      datasetTitle,
      firstColumnLabel,
      secondColumnLabel,
    } = props;

    if (isDesktop || items.length === 0) return null;

    return (
      <DataPeekButton
        data={data}
        buttonText="📊"
        modalTitle={datasetTitle}
        firstColumnLabel={firstColumnLabel}
        secondColumnLabel={secondColumnLabel}
        position="floating"
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          padding: "0",
          justifyContent: "center",
          fontSize: "1.2rem",
          bottom: "1rem",
          right: "1rem",
          left: "auto",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        }}
      />
    );
  }
}