import { Modal } from '@/src/shared/modal/Modal';
import { LogOutModalChildren } from '@/src/features/auth/logout/ui/logoutmodal/LogOutModalChildren';

export type LogOutModalProps = {
  open: boolean
  onClose: () => void
  emailName: string | undefined
}

export const LogOutModal = ({ open, onClose, emailName }: LogOutModalProps) => {
  return (
    <Modal open={open} onClose={onClose} modalTitle={'Log Out'}>
      <LogOutModalChildren emailName={emailName} onClick={onClose}></LogOutModalChildren>
    </Modal>
  )
}