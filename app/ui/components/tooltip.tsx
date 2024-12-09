import React from 'react'
import {
  Button,
  OverlayArrow,
  Tooltip as TooltipPrimitive,
  TooltipTrigger,
  type TooltipProps as TooltipPrimitiveProps,
} from 'react-aria-components'
import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'
import { cr } from '@/lib/utils/css'

const tooltipStyles = tv({
  base: [
    'group rounded-lg border px-3 py-1.5 text-sm will-change-transform dark:shadow-none [&_strong]:font-medium',
    'placement-left:slide-in-from-right-1 placement-right:slide-in-from-left-1 placement-top:slide-in-from-bottom-1 placement-bottom:slide-in-from-top-1',
  ],
  variants: {
    intent: {
      default:
        'bg-overlay text-overlay-foreground [&_.arx]:fill-overlay [&_.arx]:stroke-border',
      inverse:
        'bg-dark dark:[&_.text-muted-foreground]:text-dark/70 [&_.text-muted-foreground]:text-light/70 text-light dark:bg-light dark:text-dark dark:[&_.arx]:fill-light [&_.arx]:fill-dark border-transparent [&_.arx]:stroke-transparent',
    },
    isEntering: {
      true: 'animate-in fade-in',
    },
    isExiting: {
      true: 'animate-in fade-in direction-reverse',
    },
  },
  defaultVariants: {
    intent: 'default',
  },
})

const Tooltip = (props: React.ComponentProps<typeof TooltipTrigger>) => (
  <TooltipTrigger {...props}>{props.children}</TooltipTrigger>
)

interface ContentProps
  extends Omit<TooltipPrimitiveProps, 'children'>,
    VariantProps<typeof tooltipStyles> {
  showArrow?: boolean
  children: React.ReactNode
}

const Content = ({
  showArrow = true,
  intent = 'default',
  children,
  ...props
}: ContentProps) => {
  return (
    <TooltipPrimitive
      {...props}
      offset={10}
      className={cr(props.className, (className, renderProps) =>
        tooltipStyles({
          ...renderProps,
          intent,
          className,
        }),
      )}
    >
      {showArrow && (
        <OverlayArrow>
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className="group-placement-left:-rotate-90 group-placement-right:rotate-90 group-placement-bottom:rotate-180 arx forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]"
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </TooltipPrimitive>
  )
}

Tooltip.Trigger = Button
Tooltip.Content = Content

export { Tooltip }
