'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button, Input, Modal, Typography, Card } from '@mger/ui_kit_binary_bears'
import { confirmPasswordReset, terminateAllOtherSessions } from '@/shared/api/passwordRecovery.api'
import s from './ResetPassword.module.scss'

export type ResetPasswordProps = {
  code?: string
  onSuccess?: () => void
}

const PASSWORDS_MUST_MATCH = 'Passwords must match'
const PASSWORD_HINT = 'Your password must be between 6 and 20 characters.'

export const ResetPassword = ({ code, onSuccess }: ResetPasswordProps) => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successModalOpen, setSuccessModalOpen] = useState(false)

  const searchParams = useSearchParams()

  const passwordsMatch = newPassword === confirmPassword
  const isFormValid =
    newPassword.length > 0 && confirmPassword.length > 0 && passwordsMatch

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setLoading(true)
    setError(null)
    
    try {
      const codeFromUrl = searchParams.get('code')
      const effectiveCode = codeFromUrl ?? code

      const result = await confirmPasswordReset(newPassword, effectiveCode || '')
      if (result.success) {
        await terminateAllOtherSessions()
        setSuccessModalOpen(true)
      } else {
        setError(result.error || 'Failed to reset password')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false)
    onSuccess?.()
  }

  return (
    <div className={s.page}>
      <Card as="form" className={s.form} onSubmit={handleSubmit}>
        <Typography variant="large" className={s.title}>
          Create new password
        </Typography>
        
        {error && (
          <div className={s.error}>
            <Typography variant="regular_text_14">{error}</Typography>
          </div>
        )}

        <Input
          id="new-password"
          label="New password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          autoComplete="new-password"
        />
        <Input
          id="confirm-password"
          label="Password confirmation"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          autoComplete="new-password"
          error={
            !passwordsMatch && confirmPassword.length > 0
              ? PASSWORDS_MUST_MATCH
              : undefined
          }
        />
        <Typography variant="regular_text_14" className={s.hint}>
          {PASSWORD_HINT}
        </Typography>
        <Button 
          type="submit" 
          fullWidth 
          disabled={!isFormValid || loading}
        >
          {loading ? 'Creating...' : 'Create new password'}
        </Button>
      </Card>

      <Modal
        open={successModalOpen}
        onClose={handleSuccessModalClose}
        modalTitle="Password Reset Successful"
        size="sm"
        hideDivider
      >
        <div className={s.modalContent}>
          <Typography variant="regular_text_14" className={s.successMessage}>
            Your password has been successfully changed. All active sessions have been terminated.
          </Typography>
          <Button type="button" onClick={handleSuccessModalClose} fullWidth>
            OK
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default ResetPassword
