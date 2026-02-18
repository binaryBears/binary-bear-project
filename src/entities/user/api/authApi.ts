import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_AUTH_API_URL
}),
  endpoints: (builder) => ({
    signIn: builder.mutation<{ accessToken: string }, { email: string; password: string }> ({
      query: body => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    signUp: builder.mutation<void, { username: string; email: string; password: string; baseUrl: string}> ({
      query: body => ({
        url: 'auth/registration',
        method: 'POST',
        body,
      }),
    }),
    emailResending: builder.mutation<void, { email: string }>({
      query: body => ({
        url: 'auth/email-resending',
        method: 'POST',
        body,
      }),
    }),
  })
})


export const {useSignInMutation, useSignUpMutation, useEmailResendingMutation} = authApi


