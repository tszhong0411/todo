'use client'

import { IconX } from '@tabler/icons-react'
import clsx from 'clsx'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

import { auth, firestore } from '@/lib/firebase/app'

import AuthModal from '../AuthModal'
import Spinner from '../Spinner'

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
    if (!user) return setOpen(true)
    setOpen(false)
  }, [user])

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
        <div className='flex h-[calc(100vh-64px-56px-192px)] items-center justify-center'>
          <Spinner />
        </div>
      ) : (
        <>
          <div className='space-y-8'>
            <h1 className='text-center text-3xl font-bold'>Todo List</h1>
            <form onSubmit={handleAddTodo} className='flex items-center gap-2'>
              <input
                type='text'
                name='todo'
                className='w-full rounded-lg border border-accent-2 bg-hong-bg py-2 px-4 transition-colors duration-300 hover:border-white focus:outline-none'
                placeholder='Add a new todo...'
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
              <button
                type='submit'
                className='rounded-lg border border-white bg-white py-2 px-4 font-bold text-black transition-colors duration-300 hover:bg-black hover:text-white'
              >
                Add
              </button>
            </form>
            <div className='space-y-4'>
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={
                    'flex h-12 items-center justify-between rounded-lg border border-accent-2 py-2 px-4'
                  }
                >
                  <button
                    onClick={() => handleCompleteTodo(todo.id)}
                    className={clsx({
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
