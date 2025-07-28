import React from "react";
import "@/styles/quizQuestionView.css"; // Adjust path as needed

export function QuizQuestionView({
  questionPrompt,
  question,
  input,
  onInput,
  onSubmit,
  feedback,
  feedbackColor,
  inputRef,
  disabled,
  onMenu,
  onListen,
}: {
  questionPrompt: string;
  question: string;
  input: string;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  feedback: string | null;
  feedbackColor: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  disabled: boolean;
  onMenu: () => void;
  onListen: () => void;
}) {
  return (
    <>
      <h2 className="qqv-title">{questionPrompt}</h2>
      <div className="qqv-question">{question}</div>
      <form className="qqv-form" onSubmit={onSubmit}>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={onInput}
          placeholder="..."
          className="qqv-input"
          disabled={disabled}
        />
        <button
          type="submit"
          className="qqv-btn"
          disabled={disabled}
        >
          Check
        </button>
        <button
          type="button"
          className="qqv-btn-menu"
          onClick={onMenu}
          disabled={disabled}
          title="Return to menu"
        >
          Menu
        </button>
        <button
          type="button"
          className="qqv-btn-listen"
          onClick={onListen}
          disabled={disabled}
          title="Hear the word in Greek"
        >
          Listen
        </button>
      </form>
      {feedback && (
        <div
          className="qqv-feedback"
          style={{ color: feedbackColor }}
        >
          {feedback}
        </div>
      )}
    </>
  );
}