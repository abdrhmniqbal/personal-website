import * as React from 'react'
import type {
  DialogTriggerProps,
  ModalOverlayProps,
  PopoverProps as PopoverPrimitiveProps,
} from 'react-aria-components'
import {
  DialogTrigger,
  Modal,
  ModalOverlay,
  OverlayArrow,
  PopoverContext,
  Popover as PopoverPrimitive,
  useSlottedContext,
  type DialogProps,
} from 'react-aria-components'
import { twJoin } from 'tailwind-merge'
import { tv } from 'tailwind-variants'
import { useMediaQuery } from '@/lib/hooks/use-media-query'
import { cn, cr } from '@/lib/utils/css'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog'

const Popover = ({ children, ...props }: DialogTriggerProps) => {
  return <DialogTrigger {...props}>{children}</DialogTrigger>
}

const Title = ({
  level = 2,
  className,
  ...props
}: React.ComponentProps<typeof DialogTitle>) => (
  <DialogTitle
    className={cn('sm:leading-none', level === 2 && 'sm:text-lg', className)}
    {...props}
  />
)

const Header = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <DialogHeader className={cn('p-0 sm:pt-0', className)} {...props} />
)

const Footer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <DialogFooter className={cn('pb-0 pt-4 sm:pb-0', className)} {...props} />
)

const Body = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <DialogBody className={cn('p-0', className)} {...props} />
)

const popoverContentStyles = tv({
  base: [
    'bg-overlay text-overlay-foreground min-w-80 max-w-xs rounded-xl border bg-clip-padding p-4 shadow-sm [scrollbar-width:thin] sm:max-w-3xl lg:text-sm dark:backdrop-blur-2xl dark:backdrop-saturate-200 [&::-webkit-scrollbar]:size-0.5',
  ],
  variants: {
    isMenu: {
      true: {
        true: 'p-0',
      },
    },
    isEntering: {
      true: [
        'duration-50 animate-in fade-in placement-left:slide-in-from-right-1 placement-right:slide-in-from-left-1 placement-top:slide-in-from-bottom-1 placement-bottom:slide-in-from-top-1 ease-out',
      ],
    },
    isExiting: {
      true: 'duration-50 animate-out fade-out placement-left:slide-out-to-right-1 placement-right:slide-out-to-left-1 placement-top:slide-out-to-bottom-1 placement-bottom:slide-out-to-top-1 ease-in',
    },
  },
})

const drawerStyles = tv({
  base: [
    'bg-overlay fixed bottom-0 top-auto z-50 max-h-full w-full max-w-2xl border border-b-transparent outline-none',
  ],
  variants: {
    isMenu: {
      true: 'rounded-t-xl p-0 [&_[role=dialog]]:px-0',
      false: 'rounded-t-2xl py-4',
    },
    isEntering: {
      true: [
        '[transition:transform_0.5s_cubic-bezier(0.32,_0.72,_0,_1)] [will-change:transform]',
        'animate-in fade-in-0 slide-in-from-bottom-56 duration-200',
        '[transition:translate3d(0,_100%,_0)]',
        'sm:slide-in-from-bottom-auto sm:slide-in-from-top-[20%]',
      ],
    },
    isExiting: {
      true: 'animate-out slide-out-to-bottom-56 duration-200 ease-in',
    },
  },
})

interface PopoverProps
  extends Omit<React.ComponentProps<typeof Modal>, 'children'>,
    Omit<PopoverPrimitiveProps, 'children' | 'className'>,
    Omit<ModalOverlayProps, 'className'> {
  children: React.ReactNode
  showArrow?: boolean
  style?: React.CSSProperties
  respectScreen?: boolean
  'aria-label'?: DialogProps['aria-label']
  'aria-labelledby'?: DialogProps['aria-labelledby']
  className?: string | ((values: { defaultClassName?: string }) => string)
}

const Content = ({
  respectScreen = true,
  children,
  showArrow = true,
  className,
  ...props
}: PopoverProps) => {
  const isMobile = useMediaQuery('(max-width: 600px)')
  const popoverContext = useSlottedContext(PopoverContext)!
  const isMenuTrigger = popoverContext?.trigger === 'MenuTrigger'
  const isSubmenuTrigger = popoverContext?.trigger === 'SubmenuTrigger'
  const isMenu = isMenuTrigger || isSubmenuTrigger
  const offset = showArrow ? 12 : 8
  const effectiveOffset = isSubmenuTrigger ? offset - 5 : offset
  return isMobile && respectScreen ? (
    <ModalOverlay
      className={twJoin(
        'bg-overlay/10 fixed left-0 top-0 isolate z-50 h-[--visual-viewport-height] w-full [--visual-viewport-vertical-padding:16px]',
        isSubmenuTrigger ? 'bg-overlay/10' : '',
      )}
      {...props}
      isDismissable
    >
      <Modal
        className={cr(className, (className, renderProps) =>
          drawerStyles({ ...renderProps, isMenu, className }),
        )}
      >
        <Dialog
          aria-label={isMenu ? 'Menu' : props['aria-label']}
          className="touch-none focus:outline-none"
        >
          {children}
        </Dialog>
      </Modal>
    </ModalOverlay>
  ) : (
    <PopoverPrimitive
      offset={effectiveOffset}
      {...props}
      className={cr(className, (className, renderProps) =>
        popoverContentStyles({
          ...renderProps,
          className,
        }),
      )}
    >
      {showArrow && (
        <OverlayArrow className="group">
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className="group-placement-left:-rotate-90 group-placement-right:rotate-90 group-placement-bottom:rotate-180 stroke-border fill-overlay block"
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </PopoverPrimitive>
  )
}

const Picker = ({ children, className, ...props }: PopoverProps) => {
  return (
    <PopoverPrimitive
      {...props}
      className={cr(
        className as PopoverPrimitiveProps['className'],
        (className, renderProps) =>
          popoverContentStyles({
            ...renderProps,
            className: cn(
              'max-h-72 min-w-[--trigger-width] overflow-y-auto p-0',
              className,
            ),
          }),
      )}
    >
      {children}
    </PopoverPrimitive>
  )
}

Popover.Primitive = PopoverPrimitive
Popover.Trigger = DialogTrigger
Popover.Close = DialogClose
Popover.Content = Content
Popover.Description = DialogDescription
Popover.Body = Body
Popover.Footer = Footer
Popover.Header = Header
Popover.Picker = Picker
Popover.Title = Title

export { Popover, drawerStyles, popoverContentStyles }
