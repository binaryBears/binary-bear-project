import * as Dialog from "@radix-ui/react-dialog"
import s from './modal.module.scss'
import { clsx } from 'clsx'
import type {ComponentPropsWithoutRef} from "react";
// import Close from "../../accets/icons/components/Close.tsx";

type ModalSize = 'xl' | 'lg' | 'md' | 'sm'

export type ModalProps = {
  /** The controlled open state of the Modal*/
  open: boolean
  /** Close modal handler*/
  onClose: () => void
  /** Modal title*/
  modalTitle?: string
  /** 'sm' | 'md' | 'lg':
   * sm - 378px,
   * md - 438px,
   * lg - 764px,
   * xl- 940px,
   * Default: 'md
   * For other values use className */
  size?: ModalSize
  hideCloseButton?: boolean
  hideDivider?: boolean
} & ComponentPropsWithoutRef<'div'>

export const Modal = ({
                        modalTitle,
                        open,
                        children,
                        onClose,
                        size = 'md',
                        className,
                        hideCloseButton = false,
                        hideDivider = false,
                        ...rest
                      }: ModalProps) => (
  <Dialog.Root open={open} onOpenChange={(isOpen) => {
    if (!isOpen) {
      onClose()
    }
  }} {...rest}>
    <Dialog.Portal>
      <Dialog.Overlay className={s.Overlay} />
      <Dialog.Content className={clsx(s.Content, s[size], className)} aria-describedby={undefined}>
        <Dialog.Title className={s.Title}>{modalTitle}</Dialog.Title>
        {!hideDivider && <hr className={s.divider} />}
        {children}
        {!hideCloseButton && (
          <Dialog.Close asChild>
            <button className={s.IconButton}>
              {/*<Close/>*/}
            </button>
          </Dialog.Close>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)