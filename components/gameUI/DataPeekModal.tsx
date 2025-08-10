"use client";
import React, { useState, useMemo } from "react";

/**
 * Props for the DataPeekModal component
 */
interface DataPeekModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Function to close the modal */
  onClose: () => void;
  /** The data array to display */
  data: [string, string][];
  /** Title for the modal */
  title?: string;
  /** Label for the first column */
  firstColumnLabel?: string;
  /** Label for the second column */
  secondColumnLabel?: string;
}

/**
 * DataPeekModal Component
 * 
 * A modal that displays the complete dataset being used in the quiz game.
 * Features include:
 * - Search functionality to filter entries
 * - Alphabetical sorting options
 * - Copy-to-clipboard functionality
 * - Responsive design
 * - Keyboard navigation support
 * 
 * @param {DataPeekModalProps} props - Component props
 * @returns {React.ReactElement} The data peek modal
 */
const DataPeekModal: React.FC<DataPeekModalProps> = ({
  isOpen,
  onClose,
  data,
  title = "Dataset Overview",
  firstColumnLabel = "Greek",
  secondColumnLabel = "English",
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"greek" | "english" | "none">("none");
  const [copyFeedback, setCopyFeedback] = useState<string>("");

  /**
   * Filters and sorts the data based on search query and sort preference
   */
  const filteredAndSortedData = useMemo(() => {
    const filtered = data.filter(([greek, english]) =>
      greek.toLowerCase().includes(searchQuery.toLowerCase()) ||
      english.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === "greek") {
      filtered.sort((a, b) => a[0].localeCompare(b[0]));
    } else if (sortBy === "english") {
      filtered.sort((a, b) => a[1].localeCompare(b[1]));
    }

    return filtered;
  }, [data, searchQuery, sortBy]);

  /**
   * Handles copying data to clipboard
   */
  const handleCopyData = async (): Promise<void> => {
    try {
      const dataText = filteredAndSortedData
        .map(([greek, english]) => `${greek}\t${english}`)
        .join('\n');
      
      await navigator.clipboard.writeText(dataText);
      setCopyFeedback("✅ Copied to clipboard!");
      setTimeout(() => setCopyFeedback(""), 2000);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setCopyFeedback("❌ Copy failed");
      setTimeout(() => setCopyFeedback(""), 2000);
    }
  };

  /**
   * Handles keyboard navigation
   */
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "1.5rem",
          maxWidth: "600px",
          width: "100%",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid #e9ecef",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#495057",
            }}
          >
            {title}
          </h2>
          
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "#6c757d",
              padding: "0.25rem",
              borderRadius: "4px",
            }}
            title="Close modal"
          >
            ×
          </button>
        </div>

        {/* Controls */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              minWidth: "200px",
              padding: "0.5rem",
              border: "1px solid #ced4da",
              borderRadius: "4px",
              fontSize: "0.9rem",
            }}
          />

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "greek" | "english" | "none")}
            style={{
              padding: "0.5rem",
              border: "1px solid #ced4da",
              borderRadius: "4px",
              fontSize: "0.9rem",
              backgroundColor: "white",
            }}
          >
            <option value="none">Original order</option>
            <option value="greek">Sort by {firstColumnLabel}</option>
            <option value="english">Sort by {secondColumnLabel}</option>
          </select>

          {/* Copy Button */}
          <button
            onClick={handleCopyData}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            title="Copy filtered data to clipboard"
          >
            📋 Copy
          </button>
        </div>

        {/* Copy Feedback */}
        {copyFeedback && (
          <div
            style={{
              fontSize: "0.8rem",
              color: copyFeedback.includes("✅") ? "#28a745" : "#dc3545",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            {copyFeedback}
          </div>
        )}

        {/* Stats */}
        <div
          style={{
            fontSize: "0.85rem",
            color: "#6c757d",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Showing {filteredAndSortedData.length} of {data.length} entries
        </div>

        {/* Data Table */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            border: "1px solid #dee2e6",
            borderRadius: "6px",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <th
                  style={{
                    padding: "0.75rem",
                    textAlign: "left",
                    fontWeight: "600",
                    borderBottom: "1px solid #dee2e6",
                    fontSize: "0.9rem",
                  }}
                >
                  {firstColumnLabel}
                </th>
                <th
                  style={{
                    padding: "0.75rem",
                    textAlign: "left",
                    fontWeight: "600",
                    borderBottom: "1px solid #dee2e6",
                    fontSize: "0.9rem",
                  }}
                >
                  {secondColumnLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map(([greek, english], index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "white" : "#f8f9fa",
                  }}
                >
                  <td
                    style={{
                      padding: "0.75rem",
                      borderBottom: "1px solid #dee2e6",
                      fontSize: "0.9rem",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {greek}
                  </td>
                  <td
                    style={{
                      padding: "0.75rem",
                      borderBottom: "1px solid #dee2e6",
                      fontSize: "0.9rem",
                    }}
                  >
                    {english}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "1rem",
            paddingTop: "1rem",
            borderTop: "1px solid #e9ecef",
            fontSize: "0.8rem",
            color: "#6c757d",
            textAlign: "center",
          }}
        >
          Press Escape to close • Use search to find specific entries
        </div>
      </div>
    </div>
  );
};

export default DataPeekModal;