'use client'

import { signOut } from 'next-auth/react'

const SignOutButton = () => {
  return (
    <button
      className='absolute top-2.5 right-4 rounded-lg bg-zinc-700 px-4 py-2 transition-colors duration-300 hover:bg-zinc-600'
      onClick={() => signOut()}
    >
      登出
    </button>
  )
}

export default SignOutButton
