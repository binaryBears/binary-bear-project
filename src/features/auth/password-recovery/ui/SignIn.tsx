'use client'

import { useState } from 'react'
import { Button, Input, Typography, Card } from '@mger/ui_kit_binary_bears'
import s from './SignIn.module.scss'

export type SignInProps = {
  onForgotPassword?: () => void
}

export const SignIn = ({ onForgotPassword }: SignInProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Sign in attempt:', { email, password })
  }

  return (
    <div className={s.page}>
      <Card as="form" className={s.form} onSubmit={handleSubmit}>
        <Typography variant="large" className={s.title}>
          Sign In
        </Typography>
        <Input
          id="signin-email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
          autoComplete="email"
        />
        <Input
          id="signin-password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
        />
        <Button type="submit" fullWidth>
          Sign In
        </Button>
        <Button
          type="button"
          variant="asLink"
          className={s.forgotLink}
          onClick={onForgotPassword}
        >
          Forgot Password
        </Button>
      </Card>
    </div>
  )
}
