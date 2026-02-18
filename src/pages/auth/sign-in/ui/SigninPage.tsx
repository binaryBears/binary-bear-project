'use client';
import Link from 'next/link';
import { Button, IconGithub, IconGoogle } from '@mger/ui_kit_binary_bears';
import s from './SigninPage.module.scss';
import { SigninForm } from '@/src/features/auth/sign-in/ui/SigninForm';
import { ROUTES } from '@/src/shared/config/routes';
import { useSignInPage } from '@/src/pages/auth/sign-in/lib/useSignInPage';

export const SigninPage = () => {
  const {onSubmit, error} = useSignInPage()

  return (
    <div className={s.wrapper}>
      <h1>Sign In</h1>
      <div className={s.icons}>
        <Link href={'/'}>
          <IconGoogle  className={s.icon} />
        </Link>
        <Link href={'/'}>
          <IconGithub className={s.icon} />
        </Link>
      </div>
      <SigninForm onSubmit={onSubmit} error={error as string | undefined}/>
      <p className={s.account}>Don't have an account?</p>
      <Button variant={'textButton'} asChild>
        <Link href={ROUTES.AUTH.SIGN_UP}>
          Sign Up
        </Link>
      </Button>
    </div>
  );
};

