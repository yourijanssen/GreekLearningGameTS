/**
 * DOM manipulation utilities for game components
 */
export class DOMUtils {
  /**
   * Focuses and selects an input element with a small delay
   * Useful for ensuring proper focus after state updates
   *
   * @param {React.RefObject<HTMLInputElement | null>} inputRef - Reference to input element
   * @param {number} delay - Delay in milliseconds (default: 0)
   */
  static focusAndSelectInput(
    inputRef: React.RefObject<HTMLInputElement | null>,
    delay: number = 0
  ): void {
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, delay);
  }

  /**
   * Navigates to a specified URL
   *
   * @param {string} url - The URL to navigate to
   */
  static navigateTo(url: string): void {
    window.location.href = url;
  }
}
