import Link from 'next/link';
import { LoginSchema, useSigninForm } from '@/src/features/auth/sign-in/lib/useSigninForm';
import { Button, Typography} from '@mger/ui_kit_binary_bears';
import s from './SigninForm.module.scss';
import { ControlledInput } from '@/src/shared/ui';
import { ROUTES } from '@/src/shared/config/routes';



type Props = {
  onSubmit: (data: LoginSchema) => void
  error?: string
}

export const SigninForm = ({onSubmit, error}: Props) => {
  const { control, handleSubmit, errors, isValid } = useSigninForm ();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
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
        placeholder={'**********'}
        label={'Password'}
        error={errors.password?.message || error}
        autoComplete="current-password"
      />
      <Typography variant={'regular_text_14'} className={s.forgotPasswordLink}>
        <Link href={ROUTES.AUTH.FORGOT_PASSWORD}>Forgot password</Link>
      </Typography>
      <Button fullWidth={true} type="submit" disabled={!isValid}>
        Sign in
      </Button>
    </form>
  );
};

