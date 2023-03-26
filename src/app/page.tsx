import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

import Todo from '@/components/Todo'

const HomePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect('/api/auth/signin')
  }

  return <Todo user={session.user} />
}

export default HomePage
