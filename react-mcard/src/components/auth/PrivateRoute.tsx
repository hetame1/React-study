import { useUser } from '@hooks/auth/useUser'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useUser()

  if (user == null) {
    return <Navigate to="/signin" replace />
  }

  return <>{children}</>
}

export default PrivateRoute
