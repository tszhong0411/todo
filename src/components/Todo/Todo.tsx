'use client'

import { Task } from '@prisma/client'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { User } from 'next-auth'
import React from 'react'
import { toast } from 'react-hot-toast'

import Form from './Form'

type TodoProps = {
  user: User
}

const Todo = (props: TodoProps) => {
  const { user } = props

  const queryClient = useQueryClient()

  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: () =>
      fetch(`/api/tasks?id=${user.id}`, {
        cache: 'no-store',
      }).then((res) => res.json()),
  })

  const { mutate, isLoading: isMutating } = useMutation({
    mutationFn: async ({
      id,
      action,
    }: {
      id: string
      action: 'PUT' | 'DELETE'
    }) => {
      const TEXT = {
        loading: {
          PUT: '更新中 ...',
          DELETE: '刪除中 ...',
        },
        success: {
          PUT: '更新成功',
          DELETE: '刪除成功',
        },
      }

      const loading = toast.loading(TEXT.loading[action])

      const res = await fetch(`/api/tasks`, {
        method: action,
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        toast.dismiss(loading)
        toast.error('發生了錯誤')

        return
      }

      toast.dismiss(loading)
      toast.success(TEXT.success[action])
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  return (
    <>
      <h1 className='text-center text-4xl font-bold'>待辦事項</h1>
      <Form />
      <div className='space-y-2'>
        {isLoading ? (
          <>
            {Array.from(Array(8).keys()).map((i) => (
              <div
                key={i}
                className='h-14 w-full animate-pulse rounded-lg bg-zinc-200 shadow-md dark:bg-zinc-800'
              />
            ))}
          </>
        ) : (
          tasks?.map((task) => {
            const { text, id, completed } = task

            return (
              <div
                key={id}
                className={clsx(
                  'flex items-center justify-between rounded-lg bg-zinc-800 p-4 shadow-md',
                  {
                    'pointer-events-none select-none contrast-50': isMutating,
                  }
                )}
              >
                <div className='flex items-center justify-center gap-2'>
                  <button
                    className={clsx(
                      completed ? 'text-green-500' : 'text-white'
                    )}
                    onClick={() => mutate({ id, action: 'PUT' })}
                  >
                    <IconCheck strokeWidth={5} />
                  </button>
                  <div className={clsx(completed && 'line-through')}>
                    {text}
                  </div>
                </div>
                <button
                  className='text-red-400'
                  onClick={() =>
                    mutate({
                      id,
                      action: 'DELETE',
                    })
                  }
                >
                  <IconX strokeWidth={5} />
                </button>
              </div>
            )
          })
        )}
      </div>
    </>
  )
}

export default Todo
