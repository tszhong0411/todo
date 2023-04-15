'use client'

import { signOut } from 'firebase/auth'
import Image from 'next/image'

import { auth } from '@/lib/firebase/app'

const Header = () => {
  return (
    <header className='relative mx-auto flex h-16 w-full max-w-4xl items-center justify-center'>
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
        className='absolute right-8 rounded-lg border border-white bg-white px-2.5 py-1 font-bold text-black transition-colors duration-300 hover:bg-black hover:text-white'
        onClick={() => signOut(auth)}
      >
        Logout
      </button>
    </header>
  )
}

export default Header
