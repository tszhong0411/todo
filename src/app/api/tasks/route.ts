import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      {
        error: 'No id provided',
      },
      {
        status: 400,
      }
    )
  }

  const tasks = await prisma.task.findMany({
    where: {
      authorId: id,
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  return NextResponse.json(tasks)
}

export const DELETE = async (req: Request) => {
  const { id } = await req.json()

  if (!id) {
    return NextResponse.json(
      {
        error: 'No id provided',
      },
      {
        status: 400,
      }
    )
  }

  const session = await getServerSession(authOptions)

  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  })

  if (!task) {
    return NextResponse.json(
      {
        error: 'No task found',
      },
      {
        status: 404,
      }
    )
  }

  if (!session || session.user.id !== task.authorId) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      {
        status: 403,
      }
    )
  }

  await prisma.task.delete({
    where: {
      id: String(id),
    },
  })

  return new NextResponse(null, { status: 204 })
}

export const PUT = async (req: Request) => {
  const { id } = await req.json()

  if (!id) {
    return NextResponse.json(
      {
        error: 'No id provided',
      },
      {
        status: 400,
      }
    )
  }

  const session = await getServerSession()
  const email = session?.user?.email as string

  const task = await prisma.task.findUnique({
    where: {
      id,
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
    return NextResponse.json(
      {
        error: 'No task found',
      },
      {
        status: 404,
      }
    )
  }

  if (!session || email !== task.author.email) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      {
        status: 403,
      }
    )
  }

  await prisma.task.update({
    where: {
      id,
    },
    data: {
      completed: !task.completed,
    },
  })

  return new NextResponse(null, { status: 204 })
}

export const POST = async (req: Request) => {
  const { text } = await req.json()

  if (!text) {
    return NextResponse.json(
      {
        error: 'No text provided',
      },
      {
        status: 400,
      }
    )
  }

  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      {
        status: 403,
      }
    )
  }

  const { id } = session.user

  await prisma.task.create({
    data: {
      text,
      authorId: id,
    },
  })

  return new NextResponse(null, { status: 200 })
}
