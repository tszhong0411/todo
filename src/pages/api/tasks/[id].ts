import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import prisma from '@/lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  const { id } = req.query
  const { email } = session.user

  const task = await prisma.task.findUnique({
    where: {
      id: String(id),
    },
    include: {
      author: {
        select: {
          email: true,
        },
      },
    },
  })

  if (!task) {
    return res.status(404).send('Task does not exist')
  }

  if (!session || email !== task.author.email) {
    return res.status(403).send('Unauthorized')
  }

  if (req.method === 'DELETE') {
    await prisma.task.delete({
      where: {
        id: String(id),
      },
    })

    return res.status(204).end()
  }

  if (req.method === 'PUT') {
    await prisma.task.update({
      where: {
        id: String(id),
      },
      data: {
        completed: !task.completed,
      },
    })

    return res.status(204).end()
  }

  return res.status(400).send('Method not allowed.')
}

export default handler
