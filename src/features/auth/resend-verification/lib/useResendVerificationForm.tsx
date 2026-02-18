import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod';

export type ResendVerificationEmailField = { email: string }

const emailSchema = z.object({
  email: z.email({ error: 'The email must match the format example@example.com' })
})

export const useResendVerificationForm = () => {
   const { handleSubmit, control } = useForm<ResendVerificationEmailField>({
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(emailSchema),
  })

  return { control, handleSubmit }
}