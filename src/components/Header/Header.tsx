'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'

import Logo from '../Logo'

const Header = () => {
  return (
    <header className='relative flex h-16 w-full items-center justify-center'>
      <Link
        href='/'
        className='mx-auto flex max-w-4xl items-center justify-center gap-2'
      >
        <Logo width={24} height={24} />
        <div>TODO</div>
      </Link>
      <button
        className='absolute top-2.5 right-4 rounded-lg bg-zinc-700 px-4 py-2 transition-colors duration-300 hover:bg-zinc-600'
        onClick={() => signOut()}
      >
        Logout
      </button>
    </header>
  )
}

export default Header
