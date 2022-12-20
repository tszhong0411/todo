import { redirect } from 'next/navigation'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/session'

import Todo from '@/components/Todo'

const getTasks = async (id: string) => {
  const tasks = await prisma.task.findMany({
    where: {
      authorId: id,
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  return tasks
}

const HomePage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    return redirect('/api/auth/signin')
  }

  const tasks = await getTasks(user.id)

  return (
    <>
      <Todo tasks={tasks} />
    </>
  )
}

export default HomePage
