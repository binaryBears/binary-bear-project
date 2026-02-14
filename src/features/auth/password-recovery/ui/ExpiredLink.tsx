"use client"

import { useState } from 'react'
import { Button, Modal, Typography, Recaptcha, Card } from '@mger/ui_kit_binary_bears'
import { sendPasswordRecoveryLink } from '@/shared/api/passwordRecovery.api'
import s from './ForgotPassword.module.scss'

export type ExpiredLinkProps = {
  email: string
  onBackToSignIn?: () => void
}

export const ExpiredLink = ({ email, onBackToSignIn }: ExpiredLinkProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalType, setModalType] = useState<'success' | 'error'>('success')
  const [loading, setLoading] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  const handleResendLink = async () => {
    if (!recaptchaToken) return

    setLoading(true)
    try {
      const result = await sendPasswordRecoveryLink(email, recaptchaToken)

      if (result.success) {
        setModalType('success')
        setModalMessage(`We have sent a link to confirm your email to ${email}`)
        setRecaptchaToken(null)
      } else {
        setModalType('error')
        setModalMessage(result.error || 'Failed to send recovery link')
      }
      setModalOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <div className={s.page}>
      <Card className={s.form}>
        <Typography variant="large" className={s.title}>
          Email verification link expired
        </Typography>
        <Typography variant="regular_text_14" className={s.instruction}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </Typography>

        <Recaptcha
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
          onChange={(token: string | null) => setRecaptchaToken(token)}
        />

        <Button
          type="button"
          fullWidth
          disabled={!recaptchaToken || loading}
          onClick={handleResendLink}
        >
          {loading ? 'Sending...' : 'Resend link'}
        </Button>

        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={onBackToSignIn}
          disabled={loading}
        >
          Back to Sign in
        </Button>
      </Card>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        modalTitle={modalMessage}
        size="sm"
        hideDivider
      >
        <div className={s.modalContent}>
          <Button type="button" onClick={handleCloseModal}>
            OK
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default ExpiredLink
