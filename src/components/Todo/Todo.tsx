'use client'

import { Task } from '@prisma/client'
import { IconCheck, IconX } from '@tabler/icons'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-hot-toast'

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
    const loading = toast.loading('更新中 ...')

    setIsFetching(true)

    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
    })

    if (!res.ok) {
      toast.dismiss(loading)
      toast.error(await res.text())

      return
    }

    setIsFetching(false)

    startTransition(() => {
      refresh()

      toast.dismiss(loading)
      toast.success('成功更新')
    })
  }

  const deleteTask = async (id: string) => {
    const loading = toast.loading('刪除中 ...')

    setIsFetching(true)

    const res = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      toast.dismiss(loading)
      toast.error(await res.text())

      return
    }

    setIsFetching(false)

    startTransition(() => {
      refresh()

      toast.dismiss(loading)
      toast.success('成功刪除')
    })
  }

  const addTask = async (text: string, onSuccess: () => void) => {
    if (!text) return toast.error('內容不能為空')

    const loading = toast.loading('新增中 ...')

    setIsFetching(true)

    const res = await fetch(`/api/tasks`, {
      method: 'POST',
      body: JSON.stringify({
        text,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      toast.dismiss(loading)
      toast.error(await res.text())

      return
    }

    setIsFetching(false)

    startTransition(() => {
      refresh()

      toast.dismiss(loading)
      toast.success('成功新增')
      onSuccess()
    })
  }

  return (
    <>
      <h1 className='text-center text-4xl font-bold'>待辦事項</h1>
      <div className='relative'>
        <input
          type='text'
          className='my-8 w-full rounded-lg border border-zinc-600 bg-zinc-700 p-4 text-sm text-white placeholder-gray-400 outline-none focus:border-zinc-500'
          placeholder='需要做什麼？'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={() => addTask(value, () => setValue(''))}
          className='absolute top-10 right-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white outline-none transition-colors duration-300 hover:bg-blue-700'
        >
          新增
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
