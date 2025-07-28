import { FeedbackLogProps } from "@/types/game";
import React, { useState } from "react";

/**
 * Component to display the history of feedback messages for user answers.
 * @param {Object} props - The component props.
 * @param {string[]} props.history - Array of feedback messages to display.
 * @returns {JSX.Element} The rendered feedback history log.
 */
const FeedbackLog: React.FC<FeedbackLogProps> = ({ log }) => {
  const [query, setQuery] = useState("");

  const filteredLog = log.filter((msg) =>
    msg.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      style={{
        margin: "1.7rem auto 0",
        maxWidth: 420,
      }}
    >

      <div
        style={{
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
        {filteredLog.length === 0 ? (
          <span style={{ color: "#969494" }}>
            {log.length === 0
              ? "Your feedback will appear here..."
              : "No matching feedback found."}
          </span>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {filteredLog.map((msg, i) => (
              <li key={i} style={{ marginBottom: 3 }}>
                {msg}
              </li>
            ))}
          </ul>
        )}
      </div>
            <input
        type="text"
        placeholder="Search feedback..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "95%",
          padding: "0.5rem",
          marginBottom: "0rem",
          marginTop: "0.5rem",
          borderRadius: 5,
          border: "px solid #ccc",
          fontSize: "0.8rem",
        }}
      />
    </div>
    
  );
};

export default FeedbackLog;
