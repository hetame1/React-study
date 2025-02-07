import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { css } from '@emotion/react'

import Flex from '@components/shared/Flex'
import Button from '@components/shared/Button'
import { colors } from '@styles/colorPalette'
import useUser from '@hooks/auth/useUser'
import { auth } from '@remote/firebase'

function Navbar() {
  const location = useLocation()
  const showSignButton =
    ['/signin', '/signup'].includes(location.pathname) === false

  const user = useUser()

  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  const renderButton = useCallback(() => {
    if (user != null) {
      return <Button onClick={handleLogout}>로그아웃</Button>
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [user, showSignButton, handleLogout])

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/home">홈</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.gray};
`

export default Navbar
