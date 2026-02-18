import {z} from "zod"


export const signinSchema = z.object({
  email: z.email({ error: 'The email must match the format example@example.com' }),
  password: z.string().min(1, 'Password is required'),
})

export type SigninInputs = z.infer<typeof signinSchema>
