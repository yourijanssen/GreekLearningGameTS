import { useState, useEffect } from "react";

/** Minimum width for desktop layout */
const DESKTOP_BREAKPOINT = 1024;

/**
 * Custom hook for managing responsive game layout
 * @returns Layout state and style getters
 */
export const useGameLayout = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const handleResize = (): void => {
    setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getContainerStyles = (): React.CSSProperties => {
    if (isDesktop) {
      return {
        display: "flex",
        maxWidth: 1200,
        margin: "2rem auto",
        gap: "2rem",
        alignItems: "flex-start",
        padding: "0 1rem",
      };
    }
    return {
      maxWidth: 500,
      margin: "2rem auto",
      padding: "0 1rem",
    };
  };

  const getMainContentStyles = (): React.CSSProperties => {
    if (isDesktop) {
      return {
        flex: "1",
        minWidth: 0,
        textAlign: "center" as const,
      };
    }
    return {
      textAlign: "center" as const,
    };
  };

  const getSidebarStyles = (): React.CSSProperties => {
    return {
      width: 300,
      flexShrink: 0,
    };
  };

  return {
    isDesktop,
    getContainerStyles,
    getMainContentStyles,
    getSidebarStyles,
  };
};
