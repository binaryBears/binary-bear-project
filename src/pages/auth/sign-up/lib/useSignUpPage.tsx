import { useSignUpMutation } from '@/src/entities/user/api/authApi';
import { SignupFormData } from '@/src/features/auth/sign-up/model/signupSchema';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';


export const useSignUpPage = () => {
  const [signUp, { error, isSuccess, originalArgs }] = useSignUpMutation ();

  const email = originalArgs?.email;
  const onSubmit = (data: SignupFormData) => {
    const { username, email, password } = data;
    signUp ({
      username,
      email,
      password,
      baseUrl: 'http://localhost:3000/auth/email-confirm',
    });
  };
  const getErrorMessage = (err: FetchBaseQueryError | undefined): string | undefined => {
    if (err && 'status' in err && err.status === 400) {
      const errorData = err.data as any;

      if (errorData?.errorsMessages && Array.isArray (errorData.errorsMessages)) {
        const userExistsError = errorData.errorsMessages.find (
          (e: any) =>
            e.message?.includes ('already exists') ||
            e.message?.includes ('already registered'),
        );

        if (userExistsError) {
          return 'User with this email or username is already registered';
        }
      }
    }
    return undefined;
  };


  return {
    onSubmit,
    isSuccess,
    error: getErrorMessage (error as FetchBaseQueryError),
    email,
  };
};

