import AuthContext from '@/context/AuthContext'
import { app } from '@/firebase'
import { getAuth, signOut } from 'firebase/auth'
import { useContext } from 'react'
import { toast } from 'react-toastify'

const Profile = () => {
  const auth = getAuth(app)

  const onSignOut = async () => {
    try {
      await signOut(auth)
      toast.success('로그아웃 되었습니다.')
    }
    catch (error: any) {
      toast.error(error?.code)
      console.log(error);
    }
  }

  const { user } = useContext(AuthContext);

  return (
    <div className='profile__box'>

      <div className='flex__box-lg'>

        <div className='profile__image' />

        <div>
          <div className='profile__email'>{user?.email}</div>
          <div className='profile__name'>{user?.displayName || '사용자'}</div>
        </div>

      </div>

      <div 
        role='presentation' 
        className='profile__logout' 
        onClick={onSignOut}
      >
        로그아웃
      </div>
      
    </div>
  )
}

export default Profile