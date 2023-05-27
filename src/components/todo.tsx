'use client'

import { IconX } from '@tabler/icons-react'
import { Button, Input } from '@tszhong0411/ui'
import clsx from 'clsx'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

import { auth, firestore } from '@/lib/firebase/app'

import AuthModal from './auth-modal'

type TodoItem = {
  id: string
  text: string
  completed: boolean
}

const Todo = () => {
  const [todos, setTodos] = React.useState<TodoItem[]>([])
  const [value, setValue] = React.useState<string>('')
  const [user, loading] = useAuthState(auth)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (!user && !loading) return setOpen(true)
    setOpen(false)
  }, [loading, user])

  React.useEffect(() => {
    if (user) {
      const todosDocRef = doc(firestore, 'users', user?.uid as string)

      const unsubscribe = onSnapshot(todosDocRef, (doc) => {
        if (doc.exists() && doc.data()) {
          setTodos(doc.data().todos)
        }
      })

      return () => unsubscribe()
    }

    return
  }, [user])

  const handleAddTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!value) return toast.error('Please enter a todo')

    const todosDocRef = doc(firestore, 'users', user?.uid as string)

    await setDoc(todosDocRef, {
      todos: [
        ...todos,
        {
          id: uuidv4(),
          text: value,
          completed: false,
        },
      ],
    })

    return setValue('')
  }

  const handleCompleteTodo = async (id: string) => {
    const todosDocRef = doc(firestore, 'users', user?.uid as string)
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )

    await setDoc(todosDocRef, {
      todos: newTodos,
    })

    return
  }

  const handleDeleteTodo = async (id: string) => {
    const todosDocRef = doc(firestore, 'users', user?.uid as string)
    const newTodos = todos.filter((todo) => todo.id !== id)

    await setDoc(todosDocRef, {
      todos: newTodos,
    })

    return
  }

  return (
    <>
      {loading ? (
        <p>Fetching user data ...</p>
      ) : (
        <>
          <div className='space-y-8'>
            <h1 className='text-center text-3xl font-bold'>Todo List</h1>
            <form onSubmit={handleAddTodo} className='flex items-center gap-2'>
              <Input
                type='text'
                placeholder='Add a new todo ...'
                className='w-full'
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button type='submit'>Add</Button>
            </form>
            <div className='space-y-4'>
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={
                    'min-h-12 flex items-center justify-between space-x-2 rounded-lg border border-accent-2 px-4 py-2'
                  }
                >
                  <button
                    onClick={() => handleCompleteTodo(todo.id)}
                    className={clsx('break-all text-left', {
                      ['text-gray-400 line-through']: todo.completed,
                    })}
                    type='button'
                  >
                    {todo.text}
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className='rounded-lg bg-red-600 p-1 transition-colors duration-300 hover:bg-red-700'
                    type='button'
                  >
                    <IconX />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <AuthModal open={open} />
        </>
      )}
    </>
  )
}

export default Todo
