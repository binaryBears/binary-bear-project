import { Modal } from '@mger/ui_kit_binary_bears';
import { useEffect, useState } from 'react';
import s from './EmailSent.module.scss'
import { Button } from '@mger/ui_kit_binary_bears';

type Props = {
  email: string | undefined
  isOpen: boolean
  onOpenChange?: (isOpen: boolean) => void
}

export const EmailSent = ({email, isOpen, onOpenChange}: Props) => {
  const [open, setOpen] = useState<boolean>(isOpen)

  // Синхронизируем с пропсом
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false)
    onOpenChange?.(false)
  }



  return (
    <Modal
      open={open}
      onClose={handleClose}
      size={'sm'}
      modalTitle={'Email sent'}
      className={s.emailSentModal}
    >
      <div className={s.content}>
        <div className={s.description}>
             We have sent a link to confirm your email to{' '}
          {email ? <strong>{email}</strong> : 'your email address'}

        </div>

        <div className={s.footer}>
          <Button
            onClick={handleClose}
            variant="primary"
            children={'OK'}
          />
        </div>
      </div>


    </Modal>
  )
}