"use client";
import React, { useState } from "react";
import DataPeekModal from "./DataPeekModal";

/**
 * Props for the DataPeekButton component
 */
interface DataPeekButtonProps {
  /** The data array to display */
  data: [string, string][];
  /** Button text */
  buttonText?: string;
  /** Title for the modal */
  modalTitle?: string;
  /** Label for the first column */
  firstColumnLabel?: string;
  /** Label for the second column */
  secondColumnLabel?: string;
  /** Button position */
  position?: "inline" | "floating";
  /** Custom button styling */
  style?: React.CSSProperties;
}

/**
 * DataPeekButton Component
 * 
 * A button that opens a modal to peek into the complete dataset.
 * Provides unlimited access to view all quiz data with search and sort capabilities.
 * 
 * @param {DataPeekButtonProps} props - Component props
 * @returns {React.ReactElement} The data peek button
 */
const DataPeekButton: React.FC<DataPeekButtonProps> = ({
  data,
  buttonText = "📊 Peek Data",
  modalTitle = "Dataset Overview",
  firstColumnLabel = "Greek",
  secondColumnLabel = "English",
  position = "inline",
  style = {},
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = (): void => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  const getButtonStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      padding: "0.5rem 1rem",
      backgroundColor: "#6c757d",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "0.85rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      transition: "all 0.2s ease",
      fontWeight: "500",
      ...style,
    };

    if (position === "floating") {
      return {
        ...baseStyles,
        position: "fixed",
        bottom: "2rem",
        left: "2rem",
        zIndex: 100,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      };
    }

    return baseStyles;
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        style={getButtonStyles()}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#5a6268";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#6c757d";
        }}
        title="View complete dataset"
      >
        {buttonText}
      </button>

      <DataPeekModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={data}
        title={modalTitle}
        firstColumnLabel={firstColumnLabel}
        secondColumnLabel={secondColumnLabel}
      />
    </>
  );
};

export default DataPeekButton;