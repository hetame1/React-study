'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import NavItem from './NavItem';

const NavBar = () => {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  }

  return (
    <nav className='relative z-10 w-full bg-orange-500 text-white'>
      <div className='flex items-center justify-between mx-5 sm:mx-10 lg:mx-20'>

        <div className='flex items-center text-2xl h-14'>
          <Link href="/">Logo</Link>
        </div>

        <div className='text-2xl sm:hidden'>
          {menu === false ? <button onClick={toggleMenu}>+</button> : <button onClick={toggleMenu}>-</button>}
        </div>

        <div className='hidden sm:block'>
          <NavItem />
        </div>

      </div>

      <div>
        <div className='block sm:hidden'>
          {menu === false ? null : <NavItem mobile/>}
        </div>
      </div>
    </nav>
  )
}

export default NavBar