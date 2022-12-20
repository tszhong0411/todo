import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import prisma from '@/lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const { text } = req.body

  if (!session) {
    return res.status(403).send('Unauthorized')
  }

  const { id } = session.user

  if (req.method === 'POST') {
    if (!text) return res.status(400).send('Text is required')

    await prisma.task.create({
      data: {
        text: String(text),
        authorId: id,
      },
    })

    return res.status(200).end()
  }

  return res.status(400).send('Method not allowed.')
}

export default handler
