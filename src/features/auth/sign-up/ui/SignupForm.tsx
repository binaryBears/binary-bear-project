import Link from 'next/link';
import { useSignupForm } from '@/src/features/auth/sign-up/lib/useSignupForm';
import { Button } from '@mger/ui_kit_binary_bears';
import s from './SignupForm.module.scss';
import { ControlledCheckbox } from '@/src/shared/ui/controlledCheckbox';
import { ROUTES } from '@/src/shared/config/routes';
import { ControlledInput } from '@/src/shared/ui';
import { SignupFormData } from '@/src/features/auth/sign-up/model/signupSchema';
import { useEffect } from 'react';

type Props = {
  onSubmit: (data: SignupFormData) => void
  error?: string
  isSuccess?: boolean
}

export const SignupForm = ({onSubmit, error, isSuccess}: Props) => {
  const { control, handleSubmit, errors, isValid,reset } = useSignupForm ();

  useEffect(() => {
    if (isSuccess) {
      reset(); // очищает все поля
    }
  }, [isSuccess, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <ControlledInput
        name={'username'}
        control={control}
        type={'text'}
        placeholder={'Epam11'}
        label={'Username'}
        error={errors.username?.message || error}
        autoComplete={'username'}
      />
      <ControlledInput
        name={'email'}
        control={control}
        type={'email'}
        placeholder={'Epam@epam.com'}
        label={'Email'}
        error={errors.email?.message}
        autoComplete="email"
      />
      <ControlledInput
        name={'password'}
        control={control}
        type={'password'}
        placeholder={'******************'}
        label={'Password'}
        error={errors.password?.message}
        autoComplete="new-password"
      />
      <ControlledInput
        name={'confirmPassword'}
        control={control}
        type={'password'}
        placeholder={'******************'}
        label={'Password confirmation'}
        error={errors.confirmPassword?.message}
        autoComplete="new-password"
      />
      <ControlledCheckbox
        name={'agreeTerms'}
        control={control}
        className={s.checkBox}
        labelText={
          <span className={s.agreementText}>
            I agree to the {' '}
            <Link href={ROUTES.AUTH.TERMS_OF_SERVICE} className={s.link}>Terms of Service</Link>
            {' '}and{' '}
            <Link href={ROUTES.AUTH.PRIVACY_POLICY} className={s.link}>Privacy Policy</Link>
          </span>
        }
      />
      <Button
        fullWidth={true}
        type="submit"
        disabled={!isValid}
      >
        Sign Up
      </Button>
    </form>
  );
};
