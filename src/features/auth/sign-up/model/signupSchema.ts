import * as z from 'zod';

export const signupSchema = z.object ({
  username: z
    .string ()
    .min (6, 'Minimum number of characters 6')
    .max (30, 'Maximum number of characters 30')
    .regex (/^[0-9A-Za-z_-]{6,30}$/, 'Username can only contain letters, numbers, _ and -')
  ,
  email: z
    .email ('The email must match the format example@example.com')
  ,
  agreeTerms: z.boolean ().refine ((val) => val === true, {
    message: 'Checkbox is required',
  }),
  password: z
    .string ()
    .min (6, 'Minimum number of characters 6')
    .max (20, 'Maximum number of characters 20')
    .regex (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@\[\\\]^_{|}~]{6,20}$/,
      'The password must contain at least one digit, a lowercase letter, and a capital letter, can contain ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ { | } ~ ')
  ,
  confirmPassword: z
    .string (),
})
  .refine ((data) => data.password === data.confirmPassword, {
    message: 'Password must match',
    path: ['confirmPassword'],
  })

export type SignupFormData = z.infer<typeof signupSchema>
