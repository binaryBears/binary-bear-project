import { useEmailResendingMutation } from '@/src/entities/user/api/authApi';
import { ResendVerificationEmailField } from '@/src/features/auth/resend-verification/lib/useResendVerificationForm';

export const useResendVerificationPage = () => {
  const [emailResending, { error, isSuccess, originalArgs }] = useEmailResendingMutation();

  const email = originalArgs?.email
  const onSubmit = (data: ResendVerificationEmailField) => {
    emailResending (data)
    }

  return {
    onSubmit,
    isSuccess,
    email,
    error
  }
};