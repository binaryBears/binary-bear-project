'use client';
import { ResendVerificationForm } from '@/src/features/auth/resend-verification/ui/ResendVerificationForm';
import { Typography } from '@mger/ui_kit_binary_bears';
import s from './ResendVerificationPage.module.scss';
import Image from 'next/image';
import rafiki from './rafiki.png';
import { useResendVerificationPage } from '@/src/pages/auth/resend-verification/lib/useResendVerificationPage';
import { EmailSent } from '@/src/shared/ui/email-sent';

export const ResendVerificationPage = () => {

  const {onSubmit, isSuccess, email, error} = useResendVerificationPage();

  return (
    <div className={s.wrapper}>
      {isSuccess && <EmailSent email={email} isOpen={isSuccess} />}
      <Typography variant={'h1'}>
        Email verification link expired
      </Typography>
      <Typography variant={'regular_text_16'} className={s.text}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <ResendVerificationForm onSubmit={onSubmit} error={error as string | undefined} />
      <Image src={rafiki} alt={''} />
    </div>
  );
};