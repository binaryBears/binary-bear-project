'use client';
import s from './SignupPage.module.scss';
import Link from 'next/link';
import { Button, IconGithub, IconGoogle } from '@mger/ui_kit_binary_bears';
import { SignupForm } from '@/src/features/auth/sign-up/ui/SignupForm';
import { EmailSent } from '@/src/shared/ui/email-sent';
import { useSignUpPage } from '@/src/pages/auth/sign-up/lib/useSignUpPage';
import { ROUTES } from '@/src/shared/config/routes';

export const SignupPage = () => {
const {onSubmit, error, email, isSuccess} = useSignUpPage()

  return (
    <div className={s.wrapper}>
      {isSuccess && <EmailSent email={email} isOpen={isSuccess} />}
      <h1>Sign Up</h1>
      <div className={s.icons}>
        <Link href={'/'}>
          <IconGoogle className={s.icon} />
        </Link>
        <Link href={'/'}>
          <IconGithub className={s.icon} />
        </Link>
      </div>
      <SignupForm onSubmit={onSubmit}  error={error}/>
      <p className={s.haveAnAccount}>Do you have an account?</p>
      <Button variant={'textButton'}>
        <Link href={ROUTES.AUTH.SIGN_IN}>
          Sign In
        </Link>
      </Button>
    </div>
  );
};