/**
 * Formats a given date string into a human-readable format.
 *
 * @param {string} dateString - The ISO 8601 date string to format.
 * @param {string} [locales='en-US'] - The locale to use for formatting the date.
 * @returns {string} The formatted date string (e.g., "January 13, 2023").
 */
export function formatDate(
  dateString: string,
  locales: string = 'en-US',
): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locales, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}
