"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  SignupFormData,
  signupSchema,
} from '@/src/features/auth/sign-up/model/signupSchema';


export const useSignupForm = () => {

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SignupFormData, undefined> ({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
    resolver: zodResolver (signupSchema),
    mode: 'onTouched',
  });

  return {
    control,
    isValid,
    handleSubmit,
    errors,
    reset
  };
};
