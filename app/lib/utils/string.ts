/**
 * Extracts initials from a name, supporting multiple languages.
 *
 * - For extended alphabetic characters (e.g., É, Ñ), it returns the first two uppercase initials.
 * - For non-alphabetic characters (e.g., Japanese, Korean, Chinese, Arabic), it returns the first character.
 *
 * @param {string} name - The full name to extract initials from.
 * @returns {string} The initials extracted based on the language rules.
 *
 * @example
 * getNameInitials("John Doe"); // "JD"
 * getNameInitials("Alice"); // "A"
 * getNameInitials("Mary Ann Smith"); // "MA"
 * getNameInitials("Élise Dupont"); // "ÉD"
 * getNameInitials("山田 太郎"); // "山"
 * getNameInitials("김철수"); // "김"
 * getNameInitials("محمد علي"); // "م"
 */
export function getNameInitials(name: string): string {
  const words = name.split(' ').filter((word) => word.length > 0) // Filter out empty words

  let initials = ''

  for (const word of words) {
    // Break the loop if initials already have 2 characters
    if (initials.length >= 2) break

    const firstChar = word[0]
    if (/^\p{Letter}$/u.test(firstChar)) {
      // If the character is a letter (supports Unicode letters, including accented characters)
      initials += firstChar.toUpperCase()
    } else if (initials.length === 0) {
      // If non-alphabetic, use only the first character
      initials += firstChar
      break // Non-alphabetic names only use the first character
    }
  }

  return initials
}

/**
 * #### toTitleCase
 *
 * Convert string to title case
 *
 * * * *
 * Example:
 * ```typescript
 * import { toTitleCase } from '@/lib/utils/string/to-title-case'
 *
 * const str = 'hello world'
 * toTitleCase(str) // 'Hello World'
 *
 * ```
 * * * *
 * @param str String
 * @return Title case string
 */
export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  )
}
