import { configureStore } from '@reduxjs/toolkit'

import notificationsReducer from '@/src/shared/model/notifications/notificationsSlice'
import { listenerMiddleware } from './listenerMiddleware'

// import '@/shared/listeners/globalErrorListeners'
import { baseApi } from '@/src/shared/api/baseApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    notifications: notificationsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export { listenerMiddleware }
