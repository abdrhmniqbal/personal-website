import * as React from 'react'
import { ArrowRight01Icon, RadioIcon, Tick02Icon } from 'hugeicons-react'
import type {
  ButtonProps,
  MenuItemProps as MenuItemPrimitiveProps,
  MenuProps as MenuPrimitiveProps,
  MenuSectionProps,
  MenuTriggerProps as MenuTriggerPrimitiveProps,
  PopoverProps,
  SeparatorProps,
} from 'react-aria-components'
import {
  Button,
  Collection,
  Header,
  MenuItem,
  Menu as MenuPrimitive,
  MenuSection,
  MenuTrigger as MenuTriggerPrimitive,
  Separator,
  SubmenuTrigger as SubmenuTriggerPrimitive,
} from 'react-aria-components'
import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'
import { cn, cr } from '@/lib/utils/css'
import {
  dropdownHeaderStyles,
  DropdownItemDetails,
  dropdownItemStyles,
  dropdownSectionStyles,
} from './dropdown'
import { Keyboard } from './keyboard'
import { Popover } from './popover'

interface MenuContextProps {
  respectScreen: boolean
}

const MenuContext = React.createContext<MenuContextProps>({
  respectScreen: true,
})

interface MenuProps extends MenuTriggerPrimitiveProps {
  respectScreen?: boolean
}

const Menu = ({ respectScreen = true, ...props }: MenuProps) => {
  return (
    <MenuContext.Provider value={{ respectScreen }}>
      <MenuTriggerPrimitive {...props}>{props.children}</MenuTriggerPrimitive>
    </MenuContext.Provider>
  )
}

const SubMenu = ({ delay = 0, ...props }) => (
  <SubmenuTriggerPrimitive {...props} delay={delay}>
    {props.children}
  </SubmenuTriggerPrimitive>
)

const menuStyles = tv({
  slots: {
    menu: 'z32kk max-h-[calc(var(--visual-viewport-height)-10rem)] overflow-auto rounded-xl p-1 outline outline-0 [clip-path:inset(0_0_0_0_round_calc(var(--radius)-2px))] sm:max-h-[inherit]',
    popover: 'z-50 min-w-40 p-0 shadow-sm outline-none',
    trigger: [
      'focus-visible:ring-primary pressed:outline-none relative inline text-left focus:outline-none focus-visible:ring-1',
    ],
  },
})

const { menu, popover, trigger } = menuStyles()

interface MenuTriggerProps extends ButtonProps {
  className?: string
}

const Trigger = ({ className, ...props }: MenuTriggerProps) => (
  <Button className={trigger({ className })} {...props}>
    {(values) => (
      <>
        {typeof props.children === 'function'
          ? props.children(values)
          : props.children}
      </>
    )}
  </Button>
)

interface MenuContentProps<T>
  extends Omit<PopoverProps, 'children' | 'style'>,
    MenuPrimitiveProps<T> {
  className?: string
  popoverClassName?: string
  showArrow?: boolean
  respectScreen?: boolean
}

const Content = <T extends object>({
  className,
  showArrow = false,
  popoverClassName,
  ...props
}: MenuContentProps<T>) => {
  const { respectScreen } = React.useContext(MenuContext)
  return (
    <Popover.Content
      respectScreen={respectScreen}
      showArrow={showArrow}
      className={popover({
        className: cn([
          showArrow &&
            'placement-left:mt-[-0.38rem] placement-right:mt-[-0.38rem]',
          popoverClassName,
        ]),
      })}
      {...props}
    >
      <MenuPrimitive className={menu({ className })} {...props} />
    </Popover.Content>
  )
}

interface MenuItemProps
  extends Omit<MenuItemPrimitiveProps, 'isDanger'>,
    VariantProps<typeof dropdownItemStyles> {
  isDanger?: boolean
}

const Item = ({
  className,
  isDanger = false,
  children,
  ...props
}: MenuItemProps) => {
  const textValue =
    props.textValue || (typeof children === 'string' ? children : undefined)
  return (
    <MenuItem
      className={cr(className, (className, renderProps) =>
        dropdownItemStyles({
          ...renderProps,
          className,
        }),
      )}
      textValue={textValue}
      data-danger={isDanger ? 'true' : undefined}
      {...props}
    >
      {(values) => (
        <>
          {typeof children === 'function' ? children(values) : children}
          {values.hasSubmenu && (
            <ArrowRight01Icon
              className="gpfw ml-auto size-3.5"
              strokeWidth={2}
            />
          )}
        </>
      )}
    </MenuItem>
  )
}

export interface MenuHeaderProps extends React.ComponentProps<typeof Header> {
  separator?: boolean
}

const MenuHeader = ({
  className,
  separator = false,
  ...props
}: MenuHeaderProps) => (
  <Header
    className={cn(
      'p-2 text-base font-semibold sm:text-sm',
      separator && '-mx-1 border-b px-3 pb-[0.625rem]',
      className,
    )}
    {...props}
  />
)

const MenuSeparator = ({ className, ...props }: SeparatorProps) => (
  <Separator className={cn('-mx-1 my-1 h-px border-b', className)} {...props} />
)

const Checkbox = ({ className, children, ...props }: MenuItemProps) => (
  <Item className={cn('relative pr-8', className)} {...props}>
    {(values) => (
      <>
        {typeof children === 'function' ? children(values) : children}
        {values.isSelected && (
          <span className="animate-in absolute right-2 flex size-4 shrink-0 items-center justify-center">
            <Tick02Icon strokeWidth={2} />
          </span>
        )}
      </>
    )}
  </Item>
)

const Radio = ({ className, children, ...props }: MenuItemProps) => (
  <Item className={cn('relative', className)} {...props}>
    {(values) => (
      <>
        {typeof children === 'function' ? children(values) : children}

        {values.isSelected && (
          <span
            data-slot="menu-radio"
            className="animate-in absolute right-3 flex items-center justify-center"
          >
            <RadioIcon strokeWidth={2} />
          </span>
        )}
      </>
    )}
  </Item>
)

interface SectionProps<T> extends MenuSectionProps<T> {
  title?: string
}

const Section = <T extends object>({
  className,
  ...props
}: SectionProps<T>) => {
  return (
    <MenuSection className={dropdownSectionStyles({ className })} {...props}>
      {'title' in props && (
        <Header className={dropdownHeaderStyles()}>{props.title}</Header>
      )}
      <Collection items={props.items}>{props.children}</Collection>
    </MenuSection>
  )
}

Menu.Primitive = MenuPrimitive
Menu.Content = Content
Menu.Header = MenuHeader
Menu.Item = Item
Menu.Content = Content
Menu.Keyboard = Keyboard
Menu.Checkbox = Checkbox
Menu.Radio = Radio
Menu.Section = Section
Menu.Separator = MenuSeparator
Menu.Trigger = Trigger
Menu.ItemDetails = DropdownItemDetails
Menu.Submenu = SubMenu

export { Menu, type MenuContentProps }
