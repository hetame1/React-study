import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { auth, provider } from '../firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

type User = {
  displayName: string;
  email: string;
  photoURL: string;
}

const Nav = () => {
  const userDataString = localStorage.getItem("userData");
  const initialUserData: User | null = userDataString
  ? JSON.parse(userDataString) as any
  : null;

  const [show, setShow] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("")
  const { pathname } = useLocation();
  const [userData, setUserData] = useState<User | null>(initialUserData as User)

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        if(pathname === "/") {
          navigate("/main");
        }
      } else {
        navigate("/");
      }
    })
  }, [auth, navigate, pathname])

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
    navigate(`/search?query=${searchValue}`)
  }

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result: any) => {
        setUserData(result.user);
        localStorage.setItem("userData", JSON.stringify(result.user));
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      setUserData(null);
      navigate("/");
    })
    .catch((error) => {console.log(error);})
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
      {pathname === '/' ? 
      (<Login onClick={handleAuth}>Login</Login>) :
      <>
        <SearchBar>
          <input
            value={searchValue}
            onChange={handleSearch}
            type='text' 
            placeholder='Search'
          />
        </SearchBar>
        <SignOut>
          <UserImg src={userData?.photoURL} alt={userData?.displayName} />
          <DropDown>
            <span onClick={handleSignOut}>Sign Out</span>
          </DropDown>
        </SignOut>
      </>
      }   
        
    </NavWrapper>
  )
}

export default Nav

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background-color: rgba(19, 19, 19, 0.8);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
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

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`