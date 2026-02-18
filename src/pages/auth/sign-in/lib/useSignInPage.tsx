import { useSignInMutation } from '@/src/entities/user/api/authApi';
import { useRouter } from 'next/navigation';
import { LoginSchema } from '@/src/features/auth/sign-in/lib/useSigninForm';
import { ROUTES } from '@/src/shared/config/routes';


export const useSignInPage = () => {
  const router = useRouter()
  const [signIn, { error}] = useSignInMutation()

  const onSubmit = (data: LoginSchema) => {
    signIn(data).unwrap().then((res) => {
      console.log(res);
      if (res?.accessToken) {
        localStorage.setItem ('accessToken', res.accessToken)
        router.replace (ROUTES.HOME)
        router.refresh()
      }})
  }
  return {onSubmit, error}
}

