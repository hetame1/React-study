import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

type user = {
  displayName: string;
  email: string;
  photoURL: string;
}

const Nav = () => {
  const [show, setShow] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("")
  // const [userData, setUserData] = useState<user>({} as user)

  const Navigate = useNavigate();

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

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

  const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) : void => {
    setSearchValue(e.target.value)
    Navigate(`/search?query=${searchValue}`)
  }

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user)
      }).catch((error) => {

      });
  }

  return (
    <NavWrapper show={show}>
      <Logo>
        <img 
          src='/images/logo.svg'
          alt='logo'
          onClick={() => window.location.href = '/'}
        />
      </Logo>
      <SearchBar>
        <input
          value={searchValue}
          onChange={handleSearch}
          type='text' 
          placeholder='Search'
        />
      </SearchBar>

      <Login
        onClick={handleAuth} 
      >login
      </Login>
      
    </NavWrapper>
  )
}

export default Nav

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);

`

const  SearchBar = styled.div`
  position: relative;
  
  input {
    background-color: rgba(0, 0, 0, 0.6);
    border: none;
    outline: none;
    padding: 10px 50px;
    color: white;
    border-radius: 4px;
    width: 100%;
  }
`

const NavWrapper = styled.nav<{show: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${props => props.show ? "#090b13" : "transparent"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  z-index: 3;
`
const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
  }
`