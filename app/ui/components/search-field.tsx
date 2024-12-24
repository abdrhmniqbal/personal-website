'use client'

import { Cancel01Icon, Search01Icon } from 'hugeicons-react'
import {
  SearchField as SearchFieldPrimitive,
  type SearchFieldProps as SearchFieldPrimitiveProps,
  type ValidationResult,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'
import { ctr } from '@/lib/utils/css'
import { Button } from './button'
import { Description, FieldError, FieldGroup, Input, Label } from './field'
import { Loader } from './loader'

const searchFieldStyles = tv({
  slots: {
    base: 'group flex min-w-10 flex-col gap-y-1.5',
    searchIcon:
      'text-muted-fg group-data-disabled:text-muted-fg ml-2.5 size-4 shrink-0 forced-colors:text-[ButtonText] forced-colors:group-data-disabled:text-[GrayText]',
    clearButton: [
      'text-muted-fg data-hovered:text-fg data-pressed:text-fg mr-1 size-8 group-data-empty:invisible data-hovered:bg-transparent data-pressed:bg-transparent',
    ],
    input: '[&::-webkit-search-cancel-button]:hidden',
  },
})

const { base, searchIcon, clearButton, input } = searchFieldStyles()

interface SearchFieldProps extends SearchFieldPrimitiveProps {
  label?: string
  placeholder?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  isPending?: boolean
}

const SearchField = ({
  className,
  placeholder,
  label,
  description,
  errorMessage,
  isPending,
  ...props
}: SearchFieldProps) => {
  return (
    <SearchFieldPrimitive
      aria-label={placeholder ?? props['aria-label'] ?? 'Search...'}
      {...props}
      className={ctr(className, base())}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup>
        <Search01Icon strokeWidth={2} aria-hidden className={searchIcon()} />
        <Input placeholder={placeholder ?? 'Search...'} className={input()} />
        {isPending ? (
          <Loader variant="spin" />
        ) : (
          <Button
            size="square-petite"
            appearance="plain"
            className={clearButton()}
          >
            <Cancel01Icon strokeWidth={2} aria-hidden />
          </Button>
        )}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </SearchFieldPrimitive>
  )
}

export type { SearchFieldProps }
export { SearchField }
