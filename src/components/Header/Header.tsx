'use client'

import { signOut } from 'firebase/auth'
import Image from 'next/image'

import { auth } from '@/lib/firebase/app'

const Header = () => {
  return (
    <header className='relative flex h-16 w-full items-center justify-center'>
      <div className='flex items-center gap-2'>
        <Image
          src='https://honghong.me/static/images/avatar.png'
          width={40}
          height={40}
          alt='Logo'
          className='rounded-full'
          priority
        />
        Todo
      </div>
      <button
        type='button'
        className='absolute right-4 rounded-lg border border-white bg-white px-2.5 py-1 text-black transition-colors duration-300 hover:bg-black hover:text-white'
        onClick={() => signOut(auth)}
      >
        Logout
      </button>
    </header>
  )
}

export default Header
