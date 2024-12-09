import React from 'react'
import {
  Button as DialogClosePrimitive,
  type ButtonProps as DialogCloseProps,
} from '@/ui/components/button'
import { Cancel01Icon } from 'hugeicons-react'
import type {
  DialogProps,
  HeadingProps as DialogTitlePrimitiveProps,
  ButtonProps as DialogTriggerProps,
} from 'react-aria-components'
import {
  Button as DialogCloseIndicatorPrimitive,
  Dialog as DialogPrimitive,
  Heading as DialogTitlePrimitive,
  Button as DialogTriggerPrimitive,
  OverlayTriggerStateContext,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'
import { useMediaQuery } from '@/lib/hooks/use-media-query'

/** Styless Variants */
export const dialogStyles = tv({
  base: 'dlc relative flex max-h-[inherit] flex-col overflow-hidden outline-none [scrollbar-width:thin] [&::-webkit-scrollbar]:size-0.5',
})

export const dialogHeaderStyles = tv({
  base: 'relative flex flex-col pb-3 pt-4 sm:pt-6',
})

export const dialogDescriptionStyles = tv({
  base: 'text-muted-foreground mt-0.5 block text-sm sm:mt-1',
})

export const dialogBodyStyles = tv({
  base: 'flex flex-1 flex-col gap-2 overflow-auto px-4 py-1 sm:px-6',
})

export const dialogFooterStyles = tv({
  base: 'mt-auto flex flex-col-reverse justify-between gap-3 pb-4 pt-4 sm:flex-row sm:pb-6',
})

export const closeIndicatorStyles = tv({
  base: 'close focus:bg-secondary hover:bg-secondary absolute right-1 top-1 z-50 grid size-8 place-content-center rounded-xl sm:right-2 sm:top-2 sm:size-7 sm:rounded-md',
})

export const titleStyles = tv({
  base: 'text-foreground flex flex-1 items-center',
  variants: {
    level: {
      1: 'text-lg font-semibold sm:text-xl',
      2: 'text-lg font-semibold sm:text-xl',
      3: 'text-base font-semibold sm:text-lg',
      4: 'text-base font-semibold',
    },
  },
})

/** Dialog Component */
const Dialog = ({ role, className, ...props }: DialogProps) => (
  <DialogPrimitive
    {...props}
    role={role ?? 'dialog'}
    className={dialogStyles({ className })}
  />
)
Dialog.displayName = 'Dialog'

/** Trigger Component */
const DialogTrigger = ({ children, ...props }: DialogTriggerProps) => (
  <DialogTriggerPrimitive {...props}>
    {(values) => (
      <>{typeof children === 'function' ? children(values) : children}</>
    )}
  </DialogTriggerPrimitive>
)
DialogTrigger.displayName = 'DialogTrigger'

/** Header Component */
export interface DialogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
}

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => {
  const headerRef = React.useRef<HTMLHeadingElement>(null)

  React.useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        header.parentElement?.style.setProperty(
          '--dialog-header-height',
          `${entry.target.clientHeight}px`,
        )
      }
    })

    observer.observe(header)
    return () => observer.unobserve(header)
  }, [])

  return (
    <div
      data-slot="dialog-header"
      ref={headerRef}
      className={dialogHeaderStyles({ className })}
    >
      {props.title && <DialogTitle>{props.title}</DialogTitle>}
      {props.description && (
        <DialogDescription>{props.description}</DialogDescription>
      )}
      {!props.title && typeof props.children === 'string' ? (
        <DialogTitle {...props} />
      ) : (
        props.children
      )}
    </div>
  )
}
DialogHeader.displayName = 'DialogHeader'

/** Title Component */
export interface DialogTitleProps
  extends Omit<DialogTitlePrimitiveProps, 'level'> {
  level?: 1 | 2 | 3 | 4
}

const DialogTitle = ({ level = 2, className, ...props }: DialogTitleProps) => (
  <DialogTitlePrimitive
    slot="title"
    level={level}
    className={titleStyles({ level, className })}
    {...props}
  />
)
DialogTitle.displayName = 'DialogTitle'

/** Description Component */
const DialogDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={dialogDescriptionStyles({ className })} {...props} />
)
DialogDescription.displayName = 'DialogDescription'

/** Body Component */
const DialogBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="dialog-body"
    className={dialogBodyStyles({ className })}
    {...props}
  />
)
DialogBody.displayName = 'DialogBody'

/** Footer Component */
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const footerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        footer.parentElement?.style.setProperty(
          '--dialog-footer-height',
          `${entry.target.clientHeight}px`,
        )
      }
    })

    observer.observe(footer)
    return () => observer.unobserve(footer)
  }, [])

  return (
    <div
      ref={footerRef}
      data-slot="dialog-footer"
      className={dialogFooterStyles({ className })}
      {...props}
    />
  )
}
DialogFooter.displayName = 'DialogFooter'

/** Close Component */
const DialogClose = ({
  className,
  appearance = 'outline',
  ...props
}: DialogCloseProps) => {
  const state = React.useContext(OverlayTriggerStateContext)!
  return (
    <DialogClosePrimitive
      className={className}
      appearance={appearance}
      onPress={() => state.close()}
      {...props}
    />
  )
}
DialogClose.displayName = 'DialogClose'

/** Close Indicator Component */
export interface CloseButtonIndicatorProps {
  className?: string
  close: () => void
  isDismissable?: boolean | undefined
}

const DialogCloseIndicator = ({
  className,
  ...props
}: CloseButtonIndicatorProps) => {
  const isMobile = useMediaQuery('(max-width: 600px)')
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (isMobile && buttonRef.current) {
      buttonRef.current.focus()
    }
  }, [isMobile])

  return props.isDismissable ? (
    <DialogCloseIndicatorPrimitive
      ref={buttonRef}
      {...(isMobile ? { autoFocus: true } : {})}
      aria-label="Close"
      onPress={props.close}
      className={closeIndicatorStyles({ className })}
    >
      <Cancel01Icon className="size-4" strokeWidth={2} />
    </DialogCloseIndicatorPrimitive>
  ) : null
}
DialogCloseIndicator.displayName = 'DialogCloseIndicator'

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogCloseIndicator,
  DialogCloseIndicatorPrimitive,
  DialogClosePrimitive,
  DialogCloseProps,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPrimitive,
  DialogTitle,
  DialogTitlePrimitive,
  DialogTitlePrimitiveProps,
  DialogTrigger,
  DialogTriggerPrimitive,
  DialogTriggerProps,
}
