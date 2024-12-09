import { Tick02Icon } from 'hugeicons-react'
import {
  Collection as DropdownCollectionPrimitive,
  ListBoxItem as DropdownItemPrimitive,
  Section as DropdownSectionPrimitive,
  Header,
  Text,
  type ListBoxItemProps as DropdownItemProps,
  type SectionProps as DropdownSectionPrimitiveProps,
  type TextProps,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'
import { cn, cr } from '@/lib/utils/css'

/** Styles Variants */
export const dropdownItemStyles = tv({
  base: [
    'text-foreground group relative flex cursor-default select-none items-center gap-x-1.5 rounded-[calc(var(--radius)-1px)] px-2.5 py-2 text-base outline outline-0 lg:text-sm',
    'has-submenu:open:data-[danger=true]:bg-destructive/20 has-submenu:open:data-[danger=true]:text-destructive',
    'has-submenu:open:bg-accent has-submenu:open:text-accent-foreground [&[data-has-submenu][data-open]_[data-slot=icon]]:text-accent-foreground',
    '[&_[data-slot=avatar]]:-mr-0.5 [&_[data-slot=avatar]]:size-6 sm:[&_[data-slot=avatar]]:size-5',
    '[&_[data-slot=icon]]:text-muted-foreground [&[data-hovered]_[data-slot=icon]]:text-accent-foreground [&[data-focused]_[data-slot=icon]]:text-accent-foreground [&[data-danger]_[data-slot=icon]]:text-destructive/60 [&[data-focused][data-danger]_[data-slot=icon]]:text-destructive-foreground [&_[data-slot=icon]]:size-4 [&_[data-slot=icon]]:shrink-0',
    '[&_[data-slot=menu-radio]>[data-slot=icon]]:size-3',
  ],
  variants: {
    isDisabled: {
      true: 'text-muted-foreground',
    },
    isFocused: {
      false: 'data-[danger=true]:text-destructive',
      true: [
        'bg-accent text-accent-foreground',
        'data-[danger=true]:bg-destructive data-[danger=true]:text-destructive-foreground',
        '[&_.text-muted-foreground]:text-accent-foreground/80 [&[data-slot=label]]:text-accent-foreground [&[data-slot=description]]:text-accent-foreground',
      ],
    },
  },
  compoundVariants: [
    {
      isFocused: false,
      isOpen: true,
      className: 'bg-secondary',
    },
  ],
})

export const dropdownSectionStyles = tv({
  base: "xss3 flex flex-col gap-y-0.5 after:block after:h-[5px] after:content-[''] first:-mt-[5px]",
})

export const dropdownHeaderStyles = tv({
  base: 'text-muted-foreground bg-tertiary supports-[-moz-appearance:none]:bg-tertiary sticky -top-[5px] z-10 -mx-1 -mb-0.5 -mt-px min-w-[--trigger-width] truncate border-y px-4 py-2 text-sm font-medium backdrop-blur [&+*]:mt-1',
})

/** Dropdown Section Components */
export interface DropdownSectionProps<T>
  extends DropdownSectionPrimitiveProps<T> {
  title?: string
}

const DropdownSection = <T extends object>({
  className,
  ...props
}: DropdownSectionProps<T>) => {
  return (
    <DropdownSectionPrimitive className={dropdownSectionStyles({ className })}>
      {'title' in props && (
        <Header className={dropdownHeaderStyles()}>{props.title}</Header>
      )}
      <DropdownCollectionPrimitive items={props.items}>
        {props.children}
      </DropdownCollectionPrimitive>
    </DropdownSectionPrimitive>
  )
}
DropdownSection.displayName = 'DropdownSection'

/** Dropdown Item Components */
const DropdownItem = ({ className, ...props }: DropdownItemProps) => {
  const textValue =
    props.textValue ||
    (typeof props.children === 'string' ? props.children : undefined)
  return (
    <DropdownItemPrimitive
      textValue={textValue}
      className={cr(className, (className, renderProps) =>
        dropdownItemStyles({ ...renderProps, className }),
      )}
      {...props}
    >
      {cr(props.children, (children, { isSelected }) => (
        <>
          <span className="group-selected:font-medium flex flex-1 items-center gap-2 truncate font-normal">
            {children}
          </span>

          {isSelected && (
            <span className="absolute right-2 top-3 lg:top-2.5">
              <Tick02Icon strokeWidth="2" className="size-4" />
            </span>
          )}
        </>
      ))}
    </DropdownItemPrimitive>
  )
}
DropdownItem.displayName = 'DropdownItem'

export interface DropdownItemSlot extends TextProps {
  label?: TextProps['children']
  description?: TextProps['children']
  classNames?: {
    label?: TextProps['className']
    description?: TextProps['className']
  }
}

/** Dropdown Item Detail Components */
const DropdownItemDetails = ({
  label,
  description,
  classNames,
  ...props
}: DropdownItemSlot) => {
  const { slot, children, title, ...restProps } = props

  return (
    <div className="flex flex-col gap-y-1" {...restProps}>
      {label && (
        <Text
          slot={slot ?? 'label'}
          className={cn('font-medium lg:text-sm', classNames?.label)}
          {...restProps}
        >
          {label}
        </Text>
      )}
      {description && (
        <Text
          slot={slot ?? 'description'}
          className={cn(
            'text-muted-foreground text-xs',
            classNames?.description,
          )}
          {...restProps}
        >
          {description}
        </Text>
      )}
      {!title && children}
    </div>
  )
}
DropdownItemDetails.displayName = 'DropdownItemDetails'

export { DropdownItem, DropdownItemDetails, DropdownSection }
