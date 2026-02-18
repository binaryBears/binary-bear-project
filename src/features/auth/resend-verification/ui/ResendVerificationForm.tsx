import { Button } from '@mger/ui_kit_binary_bears';
import { ControlledInput } from '@/src/shared/ui';
import {
  ResendVerificationEmailField,
  useResendVerificationForm,
} from '@/src/features/auth/resend-verification/lib/useResendVerificationForm';
import s from './ResendVerificationForm.module.scss'

type Props = {
  onSubmit: (data: ResendVerificationEmailField) => void
  error?: string
}

export const ResendVerificationForm = ({ onSubmit, error }: Props) => {
  const { control, handleSubmit } = useResendVerificationForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <ControlledInput
        control={control}
        name="email"
        label={'Email'}
        placeholder={'Epam@epam.com'}
        error={error}
      />
      <Button children={'Resend verification link'} className={s.button} type="submit"/>
    </form>
  )
}