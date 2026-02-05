import { baseApi } from '@/src/shared/api/baseApi';

export const authApi = baseApi.injectEndpoints ({
  endpoints: builder => ({
    logout: builder.mutation<void, void> ({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {useLogoutMutation} = authApi