import { TouchTarget } from '@/ui/components/touch-target'
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'
import { cr, focusButtonStyles } from '@/lib/utils/css'

/** Styles Variants */
export const buttonStyles = tv(
  {
    extend: focusButtonStyles,
    base: [
      'kbt32x inline-flex select-none items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    ],
    variants: {
      intent: {
        primary: '',
        secondary: '',
        destructive: '',
      },
      appearance: {
        solid: '',
        outline: '',
        plain: '',
        link: 'select-text',
      },
      size: {
        xl: 'h-12 px-8',
        lg: 'h-11 px-6',
        md: 'h-10 px-4',
        sm: 'h-8 px-3',
        xs: 'h-5 p-2 text-xs',
      },
      shape: {
        square: 'rounded-md',
        circle: 'rounded-full',
      },
      layoutMode: {
        flexible: '',
        full: 'flex w-full',
        icon: '',
      },
      isDisabled: {
        true: 'disabled:cursor-not-allowed disabled:opacity-50',
      },
      isPending: {
        true: 'cursor-wait',
      },
    },
    compoundVariants: [
      {
        appearance: 'solid',
        intent: 'primary',
        className:
          'bg-primary text-primary-foreground pressed:bg-primary/80 hover:bg-primary/90',
      },
      {
        appearance: 'solid',
        intent: 'secondary',
        className:
          'bg-secondary text-secondary-foreground pressed:bg-secondary/80 hover:bg-secondary/80',
      },
      {
        appearance: 'solid',
        intent: 'destructive',
        className:
          'bg-destructive text-destructive-foreground pressed:bg-destructive/80 hover:bg-destructive/90',
      },
      {
        appearance: 'outline',
        intent: 'primary',
        className:
          'border-border hover:bg-primary/15 pressed:bg-primary/5 text-primary border',
      },
      {
        appearance: 'outline',
        intent: 'secondary',
        className:
          'border-secondary-foreground hover:bg-secondary/60 pressed:bg-secondary/40 text-secondary-foreground border',
      },
      {
        appearance: 'outline',
        intent: 'destructive',
        className:
          'border-destructive hover:bg-destructive/15 pressed:bg-destructive/5 text-destructive border',
      },
      {
        appearance: 'plain',
        intent: 'primary',
        className: 'text-primary hover:bg-primary/15 pressed:bg-primary/5',
      },
      {
        appearance: 'plain',
        intent: 'secondary',
        className:
          'text-secondary-foreground hover:bg-secondary/60 pressed:bg-secondary/40',
      },
      {
        appearance: 'plain',
        intent: 'destructive',
        className:
          'text-destructive hover:bg-destructive/15 pressed:bg-destructive/5',
      },
      {
        appearance: 'link',
        intent: 'primary',
        className: 'text-primary hover:underline',
      },
      {
        appearance: 'link',
        intent: 'secondary',
        className: 'text-secondary-foreground hover:underline',
      },
      {
        appearance: 'link',
        intent: 'destructive',
        className: 'text-destructive hover:underline',
      },
      {
        appearance: 'solid',
        isDisabled: true,
        className: 'bg-muted text-muted-foreground',
      },
      {
        appearance: 'outline',
        isDisabled: true,
        className: 'border-muted text-muted',
      },
      {
        appearance: 'plain',
        isDisabled: true,
        className: 'text-muted',
      },
      {
        appearance: 'link',
        isDisabled: true,
        className: 'text-muted',
      },
      {
        size: 'xs',
        layoutMode: 'icon',
        className: 'size-5 p-0',
      },
      {
        size: 'sm',
        layoutMode: 'icon',
        className: 'size-8 p-0',
      },
      {
        size: 'md',
        layoutMode: 'icon',
        className: 'size-10 p-0',
      },
      {
        size: 'lg',
        layoutMode: 'icon',
        className: 'size-11 p-0',
      },
      {
        size: 'xl',
        layoutMode: 'icon',
        className: 'size-12 px-0',
      },
    ],
    defaultVariants: {
      intent: 'primary',
      appearance: 'solid',
      size: 'md',
      shape: 'square',
      layoutMode: 'flexible',
    },
  },
  {
    responsiveVariants: ['sm', 'lg'],
  },
)

/** Button Component */
export interface ButtonProps extends ButtonPrimitiveProps {
  intent?: 'primary' | 'secondary' | 'destructive'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  appearance?: 'solid' | 'outline' | 'plain'
  shape?: 'square' | 'circle'
  layoutMode?: 'flexible' | 'full' | 'icon'
}

const Button = ({
  className,
  intent,
  appearance,
  size,
  shape,
  layoutMode,
  ...props
}: ButtonProps) => {
  return (
    <ButtonPrimitive
      {...props}
      className={cr(className, (className, renderProps) =>
        buttonStyles({
          ...renderProps,
          intent,
          appearance,
          size,
          shape,
          layoutMode,
          isPending: props.isPending || renderProps.isPending,
          className,
        }),
      )}
    >
      {(values) => (
        <TouchTarget>
          {typeof props.children === 'function'
            ? props.children(values)
            : props.children}
        </TouchTarget>
      )}
    </ButtonPrimitive>
  )
}
Button.displayName = 'Button'

export { Button, ButtonPrimitive, ButtonPrimitiveProps }
