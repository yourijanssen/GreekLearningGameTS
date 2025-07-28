// FeedbackHistory.tsx
import React from "react";
import { FeedbackLogProps } from "../interfaces/types";

/**
 * Component to display the history of feedback messages for user answers.
 * @param {Object} props - The component props.
 * @param {string[]} props.history - Array of feedback messages to display.
 * @returns {JSX.Element} The rendered feedback history log.
 */
const FeedbackLog: React.FC<FeedbackLogProps> = ({ log }) => {
  return (
    <div
      style={{
        margin: "1.7rem auto 0",
        maxWidth: 420,
        minHeight: 100,
        background: "#fff8ef",
        border: "1px solid #efb958",
        borderRadius: "7px",
        padding: "1.1rem 1.4rem",
        textAlign: "left",
        fontSize: "1.09rem",
        overflowY: "auto",
        maxHeight: 200,
      }}
    >
      {log.length === 0 ? (
        <span style={{ color: "#969494" }}>
          Your feedback will appear here...
        </span>
      ) : (
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {log.map((msg, i) => (
            <li key={i} style={{ marginBottom: 3 }}>
              {msg}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedbackLog;