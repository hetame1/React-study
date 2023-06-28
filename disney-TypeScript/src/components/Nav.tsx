import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'

interface NavWrapperProps {
  show: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if(window.scrollY > 50) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  return (
    <NavWrapper show={show}>
      <Logo>
        <img 
          src='/images/logo.svg'
          alt='logo'
        />
      </Logo>
    </NavWrapper>
  )
}

export default Nav

const NavWrapper = styled.nav<NavWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${props => props.show ? "#090b13" : "transparent"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  z-index: 3;
`
const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`