'use client'

import { signOut } from 'firebase/auth'

import { auth } from '@/lib/firebase/app'

import { Button } from './ui/button'
import { Logo } from './ui/logo'

const Header = () => {
  return (
    <header className='relative mx-auto flex h-16 w-full max-w-4xl items-center justify-center'>
      <div className='flex items-center gap-2'>
        <Logo width={22} height={22} />
        Todo
      </div>
      <Button
        type='button'
        onClick={() => signOut(auth)}
        className='absolute right-8 px-2.5 py-1'
      >
        Logout
      </Button>
    </header>
  )
}

export default Header
