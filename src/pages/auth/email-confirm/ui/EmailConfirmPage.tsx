"use client"
import { Button, Typography } from '@mger/ui_kit_binary_bears';
import Link from 'next/link';
import Image from 'next/image';
import bro from './bro.png'
import s from './EmailConfirmPage.module.scss'
import { ROUTES } from '@/src/shared/config/routes';

export const EmailConfirmPage = () => {
  return (
    <div className={s.wrapper}>
      <Typography variant={'h1'}>
        Congratulations!
      </Typography>
      <Typography variant={'regular_text_16'}>Your email has been confirmed</Typography>
      <Button asChild className={s.button}>
        <Link href={ROUTES.AUTH.SIGN_IN} className={s.link}>Sign In</Link>
      </Button>
      <Image src={bro} alt={''}/>
    </div>
  )
}