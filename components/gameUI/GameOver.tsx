// components/GameOver.tsx
import { GameOverProps } from "@/types/game";
import React from "react";

const GameOver: React.FC<GameOverProps> = ({ onMenu }) => {
  return (
    <div>
      <h2>Finished!</h2>
      <div style={{ fontSize: "1.25rem", margin: "2rem 0" }}>
        Well done! You completed the quiz.
      </div>
      <button
        onClick={onMenu}
        style={{
          fontSize: "1.15rem",
          padding: "0.55rem 1.3rem",
          background: "#ddd",
          color: "#333",
          border: "1px solid #aaa",
        }}
      >
        Back to Menu
      </button>
    </div>
  );
};

export default GameOver;