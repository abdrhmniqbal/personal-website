'use client'

import {
  type FieldErrorProps as FieldErrorPrimitiveProps,
  type GroupProps,
  type InputProps as InputPrimitiveProps,
  type LabelProps,
  type TextFieldProps as TextFieldPrimitiveProps,
  type TextProps,
  type ValidationResult,
  FieldError as FieldErrorPrimitive,
  Group,
  Input as InputPrimitive,
  Label as LabelPrimitive,
  Text,
  composeRenderProps,
} from 'react-aria-components'

import { tv } from 'tailwind-variants'
import { ctr, focusStyles } from '@/lib/utils/css'

interface FieldProps {
  label?: string
  placeholder?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  'aria-label'?: TextFieldPrimitiveProps['aria-label']
  'aria-labelledby'?: TextFieldPrimitiveProps['aria-labelledby']
}

const fieldStyles = tv({
  slots: {
    description: 'text-muted-fg text-base/6 text-pretty sm:text-sm/6',
    label: 'text-secondary-fg w-fit cursor-default text-sm font-medium',
    fieldError: 'text-danger text-sm/6 forced-colors:text-[Mark]',
    input: [
      'text-fg placeholder-muted-fg w-full min-w-0 bg-transparent px-2.5 py-2 text-base outline-hidden data-focused:outline-hidden sm:text-sm [&::-ms-reveal]:hidden',
    ],
  },
})

const { description, label, fieldError, input } = fieldStyles()

const Label = ({ className, ...props }: LabelProps) => {
  return <LabelPrimitive {...props} className={label({ className })} />
}

interface DescriptionProps extends TextProps {
  isWarning?: boolean
  ref?: React.RefObject<HTMLElement>
}

const Description = ({ ref, className, ...props }: DescriptionProps) => {
  const isWarning = props.isWarning ?? false
  return (
    <Text
      ref={ref}
      {...props}
      slot="description"
      className={description({
        className: isWarning ? 'text-warning' : className,
      })}
    />
  )
}

interface FieldErrorProps extends FieldErrorPrimitiveProps {
  ref?: React.RefObject<HTMLElement>
}
const FieldError = ({ className, ref, ...props }: FieldErrorProps) => {
  return (
    <FieldErrorPrimitive
      ref={ref}
      {...props}
      className={ctr(className, fieldError())}
    />
  )
}

const fieldGroupStyles = tv({
  base: [
    'group border-input flex h-10 items-center overflow-hidden rounded-lg border transition duration-200 ease-out',
    'group-data-invalid:focus-within:border-danger group-data-invalid:focus-within:ring-danger/20 focus-within:ring-4',
    '[&>[role=progressbar]]:mr-2.5',
    '**:data-[slot=icon]:size-4 **:data-[slot=icon]:shrink-0',
    '*:data-[slot=suffix]:text-muted-fg *:data-[slot=suffix]:mr-2.5',
    '*:data-[slot=prefix]:text-muted-fg *:data-[slot=prefix]:ml-2.5',
  ],
  variants: {
    isFocusWithin: focusStyles.variants.isFocused,
    isInvalid: focusStyles.variants.isInvalid,
    isDisabled: {
      true: 'opacity-50 forced-colors:border-[GrayText]',
    },
  },
})

const FieldGroup = ({ className, ...props }: GroupProps) => {
  return (
    <Group
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        fieldGroupStyles({
          ...renderProps,
          className,
        }),
      )}
    />
  )
}

interface InputProps extends InputPrimitiveProps {
  ref?: React.RefObject<HTMLInputElement>
}
const Input = ({ className, ref, ...props }: InputProps) => {
  return (
    <InputPrimitive ref={ref} {...props} className={ctr(className, input())} />
  )
}

export type { FieldProps, InputProps, FieldErrorProps }
export { Description, FieldError, FieldGroup, Input, Label }