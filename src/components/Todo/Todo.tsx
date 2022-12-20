'use client'

import { Task } from '@prisma/client'
import { IconCheck, IconX } from '@tabler/icons'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-hot-toast'

import { ERROR_MESSAGE } from '@/config/message'

type TodoProps = {
  tasks: Task[]
}

const Todo = (props: TodoProps) => {
  const { tasks } = props
  const { refresh } = useRouter()
  const [value, setValue] = React.useState('')
  const [isPending, startTransition] = React.useTransition()
  const [isFetching, setIsFetching] = React.useState(false)

  const isMutating = isFetching || isPending

  const updateTask = async (id: string) => {
    setIsFetching(true)

    const res = fetch(`/api/tasks/${id}`, {
      method: 'PUT',
    })

    toast.promise(res, {
      loading: 'Updating ...',
      success: (data) => {
        if (data.status !== 204) throw new Error(ERROR_MESSAGE)

        refresh()

        return 'Updated successfully'
      },
      error: ERROR_MESSAGE,
    })

    setIsFetching(false)

    startTransition(() => {
      refresh()
    })
  }

  const deleteTask = async (id: string) => {
    setIsFetching(true)

    const res = fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    })

    toast.promise(res, {
      loading: 'Deleting ...',
      success: (data) => {
        if (data.status !== 204) throw new Error(ERROR_MESSAGE)

        refresh()

        return 'Deleted successfully'
      },
      error: ERROR_MESSAGE,
    })

    setIsFetching(false)

    startTransition(() => {
      refresh()
    })
  }

  const addTask = async (text: string, onSuccess: () => void) => {
    if (!text) return toast.error('Text is required')

    setIsFetching(true)

    const res = fetch(`/api/tasks`, {
      method: 'POST',
      body: JSON.stringify({
        text,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    toast.promise(res, {
      loading: 'Adding ...',
      success: (data) => {
        if (data.status !== 200) throw new Error(ERROR_MESSAGE)

        refresh()
        onSuccess()

        return 'Added successfully'
      },
      error: ERROR_MESSAGE,
    })

    setIsFetching(false)

    startTransition(() => {
      refresh()
    })
  }

  return (
    <>
      <h1 className='text-center text-4xl font-bold'>TODO List</h1>
      <div className='relative'>
        <input
          type='text'
          className='my-8 w-full rounded-lg border border-zinc-600 bg-zinc-700 p-4 text-sm text-white placeholder-gray-400 outline-none focus:border-zinc-500'
          placeholder='What needs to be done?'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={() => addTask(value, () => setValue(''))}
          className='absolute top-10 right-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white outline-none transition-colors duration-300 hover:bg-blue-700'
        >
          Add
        </button>
      </div>
      <div
        className={clsx(
          isMutating ? 'pointer-events-none opacity-50' : 'opacity-100',
          'my-4 space-y-2'
        )}
      >
        {tasks?.map((task) => {
          const { text, id, completed } = task

          return (
            <div
              key={id}
              className='flex items-center justify-between rounded-lg bg-zinc-800 p-4 shadow-md'
            >
              <div className='flex items-center justify-center gap-2'>
                <button
                  className={clsx(completed ? 'text-green-500' : 'text-white')}
                  onClick={() => updateTask(id)}
                >
                  <IconCheck strokeWidth={5} />
                </button>
                <div className={clsx(completed && 'line-through')}>{text}</div>
              </div>
              <button onClick={() => deleteTask(id)} className='text-red-400'>
                <IconX strokeWidth={5} />
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Todo
