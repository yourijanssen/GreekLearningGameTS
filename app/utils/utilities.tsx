/**
 * Shuffles the elements of an array in place using the Fisher-Yates (Knuth) shuffle algorithm.
 * This method creates a copy of the input array and randomly rearranges its elements.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The input array to be shuffled.
 * @returns {T[]} A new shuffled array, leaving the original array unchanged.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Removes diacritics (accents) from a Greek string, for accent-insensitive comparison.
 */
export function stripGreekAccents(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ΐ|ΰ/g, (c) => (c === "ΐ" ? "ι" : "υ"));
}

/**
 * Converts Greek capital letters in a string to their lowercase equivalents for case-insensitive processing.
 * This method ensures that uppercase Greek letters are normalized to lowercase for systems that only accept lowercase Greek input.
 *
 * @param {string} text - The input string containing Greek text with possible capital letters.
 * @returns {string} The string with Greek capital letters converted to lowercase.
 * @example
 * const text = "ΣΊΓΜΑ";
 * const normalized = normalizeGreekCase(text);
 * console.log(normalized); // Output: "σίγμα"
 */
export function normalizeGreekCase(text: string): string {
  return text
    .normalize("NFD") // Decompose characters for handling diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics if any
    .replace(/[Α-ΩΆΈΉΊΌΎΏ]/g, (c) => {
      switch (c) {
        case "Α": case "Ά": return "α";
        case "Β": return "β";
        case "Γ": return "γ";
        case "Δ": return "δ";
        case "Ε": case "Έ": return "ε";
        case "Ζ": return "ζ";
        case "Η": case "Ή": return "η";
        case "Θ": return "θ";
        case "Ι": case "Ί": return "ι";
        case "Κ": return "κ";
        case "Λ": return "λ";
        case "Μ": return "μ";
        case "Ν": return "ν";
        case "Ξ": return "ξ";
        case "Ο": case "Ό": return "ο";
        case "Π": return "π";
        case "Ρ": return "ρ";
        case "Σ": return "σ";
        case "Τ": return "τ";
        case "Υ": case "Ύ": return "υ";
        case "Φ": return "φ";
        case "Χ": return "χ";
        case "Ψ": return "ψ";
        case "Ω": case "Ώ": return "ω";
        default: return c;
      }
    });
}
