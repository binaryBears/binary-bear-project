export interface PasswordRecoveryResponse {
  success: boolean
  error?: string
}

// моковая база данных пользователей 
const registeredEmails = ['user@example.com', 'demo@gmail.com', 'test@mail.com']

// тоже мок
const resetCodes = new Map<string, { email: string; expiresAt: Date }>()

// Добавить тестовый код
resetCodes.set('test123', { email: 'user@example.com', expiresAt: new Date(Date.now() + 3600000) })

// код дя сброса 
const generateResetCode = (): string => {
  return Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8)
}

// восстановление по ссыке
export const mockSendPasswordRecoveryLink = async (
  email: string,
  recaptchaToken: string
): Promise<PasswordRecoveryResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Валидация
  if (!email || !recaptchaToken) {
    return { success: false, error: 'Missing email or recaptcha token' }
  }

  if (!registeredEmails.includes(email.toLowerCase())) {
    return { success: false, error: "User with this email doesn't exist" }
  }


  const resetCode = generateResetCode()
  const expiresAt = new Date(Date.now() + 3600000) // 1 час 
  resetCodes.set(resetCode, { email, expiresAt })

  // Имитация отправки имейла
  console.log(`[MOCK] Password recovery link sent to: ${email}`)
  console.log(`[MOCK] Reset code: ${resetCode}`)
  console.log(`[MOCK] Link would be: https://your-app.com/reset-password?code=${resetCode}&email=${encodeURIComponent(email)}`)
  
  return { success: true }
}

// подтверждение сброса
export const mockConfirmPasswordReset = async (
  password: string,
  code: string
): Promise<PasswordRecoveryResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1500))

  // валидация
  if (!password || !code) {
    return { success: false, error: 'Missing password or code' }
  }

  if (password.length < 6 || password.length > 20) {
    return {
      success: false,
      error: 'Password must be between 6 and 20 characters',
    }
  }

  // Проверяем
  const resetData = resetCodes.get(code)
  if (!resetData) {
    return { success: false, error: 'Invalid or expired code' }
  }

  if (resetData.expiresAt < new Date()) {
    return { success: false, error: 'Code has expired' }
  }

  if (resetData.email !== code) { 
    return { success: false, error: 'Invalid code' }
  }


  resetCodes.delete(code)

  // якобы сброс пароля
  console.log(`[MOCK] Password reset successfully for: ${resetData.email}`)
  console.log(`[MOCK] All other sessions terminated`)
  
  return { success: true }
}


export const mockTerminateAllOtherSessions = async (): Promise<PasswordRecoveryResponse> => {
  await new Promise(resolve => setTimeout(resolve, 500)) 

  console.log('[MOCK] All other sessions terminated')
  return { success: true }
}
