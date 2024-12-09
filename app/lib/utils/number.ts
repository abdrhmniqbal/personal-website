/**
 * Shortens a large number using suffixes (e.g., 1k, 1.5m).
 *
 * @param {number} num - The number to shorten.
 * @param {number} [decimalPlaces=1] - The number of decimal places to include in the shortened output.
 * @returns {string} The shortened number with an appropriate suffix.
 *
 * @example
 * shortenNumber(1250); // "1.2k"
 * shortenNumber(1250, 2); // "1.25k"
 * shortenNumber(1500000); // "1.5m"
 * shortenNumber(1500000, 0); // "2m"
 */
export const shortenNumber = (
  num: number,
  decimalPlaces: number = 1,
): string => {
  const suffixes = ['k', 'm', 'b', 't']
  if (num < 1000) return num.toString()

  const tier = Math.floor(Math.log10(num) / 3)
  const suffix = suffixes[tier - 1] || ''
  const scale = Math.pow(10, tier * 3)
  const scaled = num / scale

  // Format the number with the specified decimal places and remove trailing zeros
  return `${scaled.toFixed(decimalPlaces).replace(/\.0+$/, '')}${suffix}`
}
