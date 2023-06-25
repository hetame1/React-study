import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Nav = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      // 컴포넌트가 사라질 때 이벤트 리스너를 제거해준다
      // 아니면 이벤트가 계속 쌓이게됨
      window.removeEventListener('scroll', () => {});
    }
  }, [])
  

  return (
    <NavWapper show={show}>
      <Logo>
        <img
          alt="Disney+"
          src="/images/logo.svg"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>
    </NavWapper>
  )
}

export default Nav

const NavWapper = styled.nav`
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
  letter-spacing: 16px;
  z-index: 3;
`;

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