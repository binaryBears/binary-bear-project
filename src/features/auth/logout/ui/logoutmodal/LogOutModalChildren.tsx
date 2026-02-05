import s from './logOutModalChildren.module.scss'
import { useDispatch } from 'react-redux'
import { useLogoutMutation } from '@/src/features/auth/authApi';
import { nanoid } from 'nanoid';
import { addNotification, clearNotifications } from '@/src/shared/model/notifications/notificationsSlice';
import { setIsLoggingIn } from '@/src/features/authSlice';

type logOutModalChildrenProps = {
  onClick: () => void
  emailName: string | undefined
}

export const LogOutModalChildren = ({ onClick, emailName }: logOutModalChildrenProps) => {
  const [logout] = useLogoutMutation()
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      await logout().unwrap()
      dispatch(setIsLoggingIn(true))
      dispatch(
        addNotification({
          id: nanoid(),
          message: 'Successfully Logout',
          variant: 'success',
          duration: 4000,
        })
      )
      window.location.href = '/'
    } catch (e) {
      if (e) {
        dispatch(clearNotifications())
        dispatch(
          addNotification({
            id: nanoid(),
            message: 'Failed Logout',
            variant: 'error',
            duration: 4000,
          })
        )
      }
    }
  }
  return (
    <div className={s.main}>
      <p className={s.text}>
        Are you really want to log out of your account
      </p>
      <p className={s.text}>
        {`"`}
        <span className={s.span}>{emailName}</span>
        {`"`}
      </p>
      <div className={s.btn_field}>
        <button onClick={handleLogout} className={s.btn_1}>
          Yes
        </button>
        <button onClick={onClick} className={s.btn_2}>
          No
        </button>
      </div>
    </div>
  )
}
