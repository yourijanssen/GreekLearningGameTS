import { FeedbackLogProps } from "@/types/game";
import React, { useState, useMemo } from "react";

/**
 * Component to display the history of feedback messages for user answers with search functionality.
 * Features include:
 * - Real-time search/filtering of feedback messages
 * - Responsive design with scrollable content
 * - Visual indicators for correct/incorrect answers
 * - Empty state handling
 * 
 * @param {Object} props - The component props
 * @param {string[]} props.log - Array of feedback messages to display (most recent first)
 * @returns {JSX.Element} The rendered feedback history log with search functionality
 */
const FeedbackLog: React.FC<FeedbackLogProps> = ({ log }) => {
  const [query, setQuery] = useState<string>("");

  /**
   * Filters the log based on the search query
   * Uses case-insensitive matching across the entire message
   */
  const filteredLog = useMemo(() => {
    if (!query.trim()) return log;
    
    return log.filter((msg) =>
      msg.toLowerCase().includes(query.toLowerCase().trim())
    );
  }, [log, query]);

  /**
   * Handles search input changes
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  /**
   * Clears the search query
   */
  const clearSearch = (): void => {
    setQuery("");
  };

  /**
   * Gets appropriate styling for feedback message based on content
   */
  const getMessageStyle = (message: string) => {
    if (message.includes("✅")) {
      return { color: "#16a34a" }; // Green for correct
    } else if (message.includes("❌")) {
      return { color: "#dc2626" }; // Red for incorrect
    }
    return {}; // Default styling
  };

  return (
    <div
      style={{
        margin: "1.7rem auto 0",
        maxWidth: 420,
      }}
    >
      {/* Search Input */}
      <div style={{ position: "relative", marginBottom: "0.5rem" }}>
        <input
          type="text"
          placeholder="Search feedback..."
          value={query}
          onChange={handleSearchChange}
          style={{
            width: "100%",
            padding: "0.5rem 2.5rem 0.5rem 0.75rem",
            borderRadius: 5,
            border: "1px solid #ccc",
            fontSize: "0.9rem",
            boxSizing: "border-box",
            outline: "none",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#efb958";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#ccc";
          }}
        />
        
        {/* Clear button */}
        {query && (
          <button
            onClick={clearSearch}
            style={{
              position: "absolute",
              right: "0.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              fontSize: "1rem",
              cursor: "pointer",
              color: "#666",
              padding: "0.25rem",
              borderRadius: "50%",
            }}
            title="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Results Count */}
      {query && (
        <div
          style={{
            fontSize: "0.8rem",
            color: "#666",
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          {filteredLog.length} of {log.length} feedback messages
          {filteredLog.length !== log.length && ` matching "${query}"`}
        </div>
      )}

      {/* Feedback Log */}
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
          scrollBehavior: "smooth",
        }}
      >
        {filteredLog.length === 0 ? (
          <span style={{ color: "#969494", fontStyle: "italic" }}>
            {log.length === 0
              ? "Your feedback will appear here as you answer questions..."
              : query
              ? `No feedback messages found matching "${query}". Try a different search term.`
              : "No feedback messages to display."}
          </span>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18, listStyleType: "none" }}>
            {filteredLog.map((msg, i) => (
              <li
                key={i}
                style={{
                  marginBottom: 8,
                  paddingLeft: 4,
                  lineHeight: 1.4,
                  ...getMessageStyle(msg),
                }}
              >
                {msg}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Log Statistics */}
      {log.length > 0 && (
        <div
          style={{
            fontSize: "0.75rem",
            color: "#888",
            textAlign: "center",
            marginTop: "0.5rem",
          }}
        >
          Total: {log.length} feedback messages
        </div>
      )}
    </div>
  );
};

export default FeedbackLog;