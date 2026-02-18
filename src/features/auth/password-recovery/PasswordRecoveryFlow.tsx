'use client'

import { useSearchParams } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'
import { ForgotPassword, ResetPassword, ExpiredLink } from '.'

type PasswordRecoveryStep = 'forgotPassword' | 'resetPassword' | 'expiredLink'

export const PasswordRecoveryFlow = () => {
  const searchParams = useSearchParams()
  const resetCode = searchParams.get('code')
  const isLinkExpired = searchParams.get('expired') === 'true'
  const emailParam = searchParams.get('email')
  
  const [currentStep, setCurrentStep] = useState<PasswordRecoveryStep>(() => {
    if (isLinkExpired) return 'expiredLink'
    if (resetCode) return 'resetPassword'
    return 'forgotPassword'
  })
  const [userEmail, setUserEmail] = useState(emailParam || '')

  useLayoutEffect(() => {
    if (isLinkExpired && currentStep !== 'expiredLink') {
      setCurrentStep('expiredLink')
    }
  }, [isLinkExpired, currentStep])

  const handleForgotPasswordSubmit = (email: string) => {
    setUserEmail(email)
  }

  const handleBackToForgotPassword = () => {
    setCurrentStep('forgotPassword')
  }

  const handlePasswordResetSuccess = () => {
    setCurrentStep('forgotPassword')
    setUserEmail('')
  }

  const handleResendLink = () => {
    setCurrentStep('forgotPassword')
  }

  const handleExpiredLink = () => {
    setCurrentStep('forgotPassword')
  }

  return (
    <div>
      {currentStep === 'forgotPassword' && (
        <ForgotPassword onBackToSignIn={() => {}} />
      )}

      {currentStep === 'resetPassword' && (
        <ResetPassword
          code={resetCode || undefined}
          onSuccess={handlePasswordResetSuccess}
        />
      )}

      {currentStep === 'expiredLink' && (
        <ExpiredLink 
          email={userEmail} 
          onBackToSignIn={handleBackToForgotPassword}
        />
      )}
    </div>
  )
}
