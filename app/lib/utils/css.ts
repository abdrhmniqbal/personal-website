import { clsx, type ClassValue } from 'clsx'
import { composeRenderProps } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

/**
 * Composes Tailwind CSS render props with additional styles or class names.
 *
 * @template T - The type of the input value for the render props function.
 * @param {string | ((value: T) => string) | undefined} baseClassName -
 *        The base class name or a function returning a class name based on input.
 * @param {string | Array<string | undefined>} additionalClasses -
 *        Additional Tailwind class(es) to be merged.
 * @returns {string | ((value: T) => string)} A string or function returning the merged class name.
 *
 * @example
 * ctr('base-class', ['bg-red-500', 'text-white']);
 * // Returns 'base-class bg-red-500 text-white'
 *
 * @example
 * ctr((props) => `dynamic-${props.type}`, 'bg-blue-500');
 * // Returns a function merging 'bg-blue-500' with the dynamic class.
 */
export function ctr<T>(
  baseClassName: string | ((value: T) => string) | undefined,
  additionalClasses: string | Array<string | undefined>,
): string | ((value: T) => string) {
  return composeRenderProps(baseClassName, (className) =>
    twMerge(additionalClasses, className),
  )
}

/**
 * Shorthand alias for `composeRenderProps` from `react-aria-components`.
 *
 * @template T - The type of the input value for the render props function.
 * @param {string | ((value: T) => string) | undefined} baseClassName -
 *        The base class name or a function returning a class name based on input.
 * @param {string | ((value: T) => string) | undefined} additionalProps -
 *        Additional render props to be composed.
 * @returns {string | ((value: T) => string)} A string or function composing the render props.
 */
export const cr = composeRenderProps

/**
 * Combines multiple class names into a single string, merging Tailwind classes intelligently.
 *
 * @param {...ClassValue[]} classes - A list of class values (strings, objects, arrays).
 * @returns {string} The merged class name string.
 *
 * @example
 * cn('bg-red-500', 'text-white', { isActive ? 'hover:bg-blue-500' : 'hover:bg-red-500' });
 * // Returns if active 'bg-red-500 text-white hover:bg-blue-500'
 */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(classes))
}

export const focusRing = tv({
  variants: {
    isFocused: { true: 'ring-ring/20 ring-4 outline-hidden' },
    isFocusVisible: { true: 'ring-ring/20 ring-4 outline-hidden' },
    isInvalid: { true: 'ring-danger/20 ring-4' },
  },
})

export const focusStyles = tv({
  extend: focusRing,
  variants: {
    isFocused: { true: 'border-ring/70 forced-colors:border-[Highlight]' },
    isInvalid: { true: 'border-danger/70 forced-colors:border-[Mark]' },
  },
})

export const focusButtonStyles = tv({
  base: 'outline-ring outline outline-offset-2 forced-colors:outline-[Highlight]',
  variants: {
    isFocusVisible: {
      false: 'outline-0',
      true: 'outline-2',
    },
  },
})
