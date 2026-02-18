"use client"

import { useState } from 'react'
import { Button, Input, Modal, Recaptcha, Typography, Card } from '@mger/ui_kit_binary_bears'
import { sendPasswordRecoveryLink } from '@/shared/api/passwordRecovery.api'
import s from './ForgotPassword.module.scss'

export type ForgotPasswordProps = {
  onBackToSignIn?: () => void
}

const INSTRUCTION_TEXT = 'Enter your email and we will send you further instruction'

export const ForgotPassword = ({ onBackToSignIn }: ForgotPasswordProps) => {
  const [email, setEmail] = useState('')
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalType, setModalType] = useState<'success' | 'error'>('success')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [sentEmail, setSentEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isFormValid = !!email.trim() && !!recaptchaToken

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setEmail(e.target.value)
  setEmailError(null)
  // Reset reCAPTCHA when email changes to prevent reuse
  if (sentEmail && e.target.value !== sentEmail) {
    setRecaptchaToken(null)
  }
}

const handleSendLink = async () => {
  if (!isFormValid) return

    setLoading(true)
    try {
      const result = await sendPasswordRecoveryLink(email.trim(), recaptchaToken!)
      if (result.success) {
        setModalType('success')
        setModalMessage(`We have sent a link to confirm your email to ${email.trim()}`)
        setSentEmail(email.trim())
        setEmailError(null)
        setModalOpen(true)
      } else {
        if (result.error === "User with this email doesn't exist") {
          setEmailError(result.error)
        } else {
          setModalType('error')
          setModalMessage(result.error || 'Failed to send recovery link')
          setModalOpen(true)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    if (modalType === 'success') {
      // keep email so user can resend; keep recaptcha token for easier resending
      // setRecaptchaToken(null) // Убираем сброс токена
    }
  }

  return (
    <div className={s.page}>
      <Card className={s.form}>
        <Typography variant="large" className={s.title}>
          Forgot Password
        </Typography>
        <Typography variant="regular_text_14" className={s.instruction}>
          {INSTRUCTION_TEXT}
        </Typography>

        <Input
          id="forgot-email"
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="example@gmail.com"
          autoComplete="email"
          error={emailError || undefined}
        />

        <Recaptcha
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
          onChange={(token: string | null) => setRecaptchaToken(token)}
        />

        <Button
          type="button"
          fullWidth
          disabled={!isFormValid || loading}
          onClick={handleSendLink}
        >
          {loading ? 'Sending...' : sentEmail === email.trim() ? 'Send link again' : 'Send link'}
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

export default ForgotPassword
