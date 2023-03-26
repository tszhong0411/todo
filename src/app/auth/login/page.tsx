import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { getProviders } from 'next-auth/react'

import { authOptions } from '@/lib/auth'

import LoginButton from './login-button'

type LoginPageProps = {
  searchParams: {
    callbackUrl: string
  }
}

const LoginPage = async (props: LoginPageProps) => {
  const { searchParams } = props

  const session = await getServerSession(authOptions)
  const providers = await getProviders()

  if (session) {
    redirect(searchParams.callbackUrl ?? '/')
  }

  return (
    <div className='flex min-h-[calc(100vh-7.5rem-12rem)] flex-col items-center justify-center gap-12'>
      <h1 className='text-[32px] font-bold'>登入到 honghong.me</h1>
      <div className='flex w-full max-w-xs flex-col gap-3'>
        {providers &&
          Object.values(providers).map((provider) => (
            <LoginButton key={provider.id} provider={provider} />
          ))}
      </div>
    </div>
  )
}

export default LoginPage
