'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SigninInputs, signinSchema } from '@/src/features/auth/sign-in/model/signinSchema';


export type LoginSchema = {
  email: string
  password: string
}


export const useSigninForm = () => {

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SigninInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signinSchema),
    mode: 'onTouched'
  })

  return {
    control,
    handleSubmit,
    errors,
    isValid
  }
}
