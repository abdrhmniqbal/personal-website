import {
  ArrowLeft01Icon,
  ArrowLeftDoubleIcon,
  ArrowRight01Icon,
  ArrowRightDoubleIcon,
  MoreHorizontalIcon,
} from 'hugeicons-react'
import {
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  type ListBoxProps,
  ListBoxSection,
  type SectionProps,
  Separator,
  composeRenderProps,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'
import { cn } from '@/lib/utils/css'
import { buttonStyles } from './button'

const paginationStyles = tv({
  slots: {
    pagination: 'mx-auto flex w-full justify-center gap-[5px]',
    section: 'flex h-9 gap-[5px]',
    list: 'flex flex-row items-center gap-[5px]',
    itemButton:
      'data-data-focus-visible:border-primary data-data-focus-visible:bg-primary/10 data-data-focus-visible:ring-4 data-data-focus-visible:ring-primary/20 cursor-pointer font-normal text-foreground',
    itemLabel: 'grid h-9 place-content-center px-3.5 tabular-nums',
    itemSeparator: 'grid h-9 place-content-center',
    itemEllipsis:
      'data-data-focus-visible:border-primary data-focused:outline-hidden data-data-focus-visible:bg-primary/10 data-data-focus-visible:ring-4 data-data-focus-visible:ring-primary/20 flex size-9 items-center justify-center rounded-lg border border-transparent',
    itemEllipsisIcon: 'flex size-9 items-center justify-center',
    defaultItem:
      'data-data-focus-visible:border-primary data-data-focus-visible:bg-primary/10 data-data-focus-visible:ring-4 data-data-focus-visible:ring-primary/20 cursor-pointer font-normal tabular-nums disabled:cursor-default disabled:opacity-100',
    itemSeparatorLine:
      'h-5 w-[1.5px] shrink-0 rotate-[14deg] bg-secondary-foreground/40',
  },
})

const {
  pagination,
  section,
  list,
  itemButton,
  itemLabel,
  itemSeparator,
  itemEllipsis,
  itemEllipsisIcon,
  defaultItem,
  itemSeparatorLine,
} = paginationStyles()

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    aria-label="pagination"
    className={pagination({ className })}
    {...props}
  />
)

const PaginationSection = <T extends object>({
  className,
  ...props
}: SectionProps<T>) => (
  <ListBoxSection {...props} className={section({ className })} />
)

const List = <T extends object>({ className, ...props }: ListBoxProps<T>) => {
  return (
    <ListBox
      orientation="horizontal"
      aria-label={props['aria-label'] || 'Pagination'}
      layout="grid"
      className={composeRenderProps(className, (className) =>
        list({ className }),
      )}
      {...props}
    />
  )
}

const renderListItem = (
  props: ListBoxItemProps & {
    textValue?: string
    'aria-current'?: string | undefined
    isDisabled?: boolean
    className?: string
  },
  children: React.ReactNode,
) => <ListBoxItem {...props}>{children}</ListBoxItem>

interface PaginationItemProps extends ListBoxItemProps {
  children?: React.ReactNode
  className?: string
  intent?: 'primary' | 'secondary'
  size?: 'md' | 'lg' | 'xs' | 'sm'
  shape?: 'square' | 'circle'
  appearance?: 'solid' | 'outline' | 'plain'
  isCurrent?: boolean
  variant?:
    | 'label'
    | 'separator'
    | 'ellipsis'
    | 'default'
    | 'last'
    | 'first'
    | 'previous'
    | 'next'
}

const Item = ({
  variant = 'default',
  size = 'sm',
  appearance = 'outline',
  intent,
  className,
  isCurrent,
  children,
  ...props
}: PaginationItemProps) => {
  const textValue =
    typeof children === 'string'
      ? children
      : typeof children === 'number'
        ? children.toString()
        : undefined

  const renderPaginationIndicator = (indicator: React.ReactNode) =>
    renderListItem(
      {
        textValue: variant,
        'aria-current': isCurrent ? 'page' : undefined,
        isDisabled: isCurrent,
        className: cn(
          buttonStyles({
            appearance: 'outline',
            size: 'sm',
            className: itemButton(),
            layoutMode: 'icon',
          }),
          className,
        ),
        ...props,
      },
      indicator,
    )

  switch (variant) {
    case 'label':
      return renderListItem(
        {
          textValue: textValue,
          className: itemLabel({ className }),
          ...props,
        },
        children,
      )
    case 'separator':
      return renderListItem(
        {
          textValue: 'Separator',
          className: itemSeparator({ className }),
          ...props,
        },
        <Separator orientation="vertical" className={itemSeparatorLine()} />,
      )
    case 'ellipsis':
      return renderListItem(
        {
          textValue: 'More pages',
          className: itemEllipsis({ className }),
          ...props,
        },
        <span aria-hidden className={itemEllipsisIcon({ className })}>
          <MoreHorizontalIcon strokeWidth={2} />
        </span>,
      )
    case 'previous':
      return renderPaginationIndicator(<ArrowLeft01Icon strokeWidth={2} />)
    case 'next':
      return renderPaginationIndicator(<ArrowRight01Icon strokeWidth={2} />)
    case 'first':
      return renderPaginationIndicator(<ArrowLeftDoubleIcon strokeWidth={2} />)
    case 'last':
      return renderPaginationIndicator(<ArrowRightDoubleIcon strokeWidth={2} />)
    default:
      return renderListItem(
        {
          textValue: textValue,
          'aria-current': isCurrent ? 'page' : undefined,
          isDisabled: isCurrent,
          className: cn(
            buttonStyles({
              intent: isCurrent ? 'primary' : intent,
              appearance: isCurrent ? 'solid' : appearance,
              size,
              className: defaultItem({ className }),
            }),
            className,
          ),
          ...props,
        },
        children,
      )
  }
}

Pagination.Item = Item
Pagination.List = List
Pagination.Section = PaginationSection

export { Pagination }
