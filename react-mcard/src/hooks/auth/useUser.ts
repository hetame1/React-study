import { userAtom } from '@/atoms/user'
import { useRecoilValue } from 'recoil'

export const useUser = () => {
  const user = useRecoilValue(userAtom)

  return user
}

export default useUser
