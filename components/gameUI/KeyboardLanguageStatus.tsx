"use client";
import React, { useState, useEffect } from "react";

/**
 * Interface for keyboard language information
 */
interface KeyboardLanguage {
  code: string;
  name: string;
  nativeName: string;
  isGreek: boolean;
}

/**
 * Props for the KeyboardLanguageStatus component
 */
interface KeyboardLanguageStatusProps {
  /** Whether to show the component */
  show?: boolean;
  /** Custom styling */
  className?: string;
  /** Compact mode for smaller displays */
  compact?: boolean;
}

/**
 * KeyboardLanguageStatus Component
 * 
 * A subtle, integrated status indicator that shows the current keyboard language
 * as part of the game's standard UI. Designed to blend naturally with other
 * game components while providing important feedback about keyboard layout.
 * 
 * @param {KeyboardLanguageStatusProps} props - Component props
 * @returns {React.ReactElement} The keyboard language status indicator
 */
const KeyboardLanguageStatus: React.FC<KeyboardLanguageStatusProps> = ({
  show = true,
  className = "",
  compact = false,
}) => {
  const [keyboardLanguage, setKeyboardLanguage] = useState<KeyboardLanguage>({
    code: "en",
    name: "English",
    nativeName: "English",
    isGreek: false,
  });
  const [isActive, setIsActive] = useState<boolean>(false);

  /**
   * Detects Greek characters in typed input
   */
  const detectGreekInput = (char: string): boolean => {
    return /[\u0370-\u03FF\u1F00-\u1FFF]/.test(char);
  };

  /**
   * Handles keyboard input to detect active layout
   */
  const handleKeyPress = (event: KeyboardEvent) => {
    const char = event.key;
    
    if (char.length === 1 && char !== " ") {
      setIsActive(true);
      
      const isGreek = detectGreekInput(char);
      
      if (isGreek) {
        setKeyboardLanguage({
          code: "el",
          name: "Greek",
          nativeName: "Ελληνικά",
          isGreek: true,
        });
      } else if (/[a-zA-Z]/.test(char)) {
        setKeyboardLanguage({
          code: "en",
          name: "English",
          nativeName: "English",
          isGreek: false,
        });
      }
      
      // Reset active state after a short time
      setTimeout(() => setIsActive(false), 1000);
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, []);

  if (!show) return null;

  const baseStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: compact ? "4px" : "8px",
    padding: compact ? "4px 8px" : "6px 12px",
    backgroundColor: keyboardLanguage.isGreek ? "#e8f5e8" : "#fff8e1",
    border: `1px solid ${keyboardLanguage.isGreek ? "#c8e6c9" : "#f9d71c"}`,
    borderRadius: "6px",
    fontSize: compact ? "0.75rem" : "0.85rem",
    fontWeight: "500",
    color: keyboardLanguage.isGreek ? "#2e7d32" : "#f57f17",
    transition: "all 0.2s ease-in-out",
    minHeight: compact ? "24px" : "32px",
    transform: isActive ? "scale(1.02)" : "scale(1)",
    boxShadow: isActive 
      ? "0 2px 8px rgba(0,0,0,0.1)" 
      : "0 1px 3px rgba(0,0,0,0.05)",
  };

  return (
    <div className={className} style={baseStyles}>
      {/* Language Flag/Icon */}
      <span style={{ fontSize: compact ? "0.9rem" : "1rem" }}>
        {keyboardLanguage.isGreek ? "🇬🇷" : "🇺🇸"}
      </span>
      
      {/* Language Name */}
      <span>
        {compact 
          ? (keyboardLanguage.isGreek ? "ΕΛ" : "EN")
          : keyboardLanguage.nativeName
        }
      </span>
      
      {/* Status Indicator */}
      <div
        style={{
          width: compact ? "6px" : "8px",
          height: compact ? "6px" : "8px",
          borderRadius: "50%",
          backgroundColor: keyboardLanguage.isGreek ? "#4caf50" : "#ff9800",
          opacity: isActive ? 1 : 0.6,
        }}
      />
    </div>
  );
};

export default KeyboardLanguageStatus;