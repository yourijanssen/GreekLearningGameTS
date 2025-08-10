import React from "react";

interface ResumeGameSectionProps {
  hasResumeGame: boolean;
  onResume: () => void;
}

export const ResumeGameSection: React.FC<ResumeGameSectionProps> = ({
  hasResumeGame,
  onResume,
}) => {
  if (!hasResumeGame) return null;

  return (
    <section className="resume-section">
      <h3>Resume your last game</h3>
      <button
        className="resume-button"
        onClick={onResume}
        style={{
          backgroundColor: "#efb958",
          color: "#000",
          border: "none",
          borderRadius: "5px",
          padding: "0.7rem 1.2rem",
          fontSize: "1rem",
          cursor: "pointer",
          marginBottom: "1rem"
        }}
      >
        ▶ Resume Numbers Typing
      </button>
    </section>
  );
};