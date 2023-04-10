'use client'

import { IconX } from '@tabler/icons-react'
import clsx from 'clsx'
import React from 'react'

type TodoItem = {
  id: number
  text: string
  completed: boolean
}

const Todo = () => {
  const [todos, setTodos] = React.useState<TodoItem[]>([])

  React.useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = event.currentTarget.todo.value
    setTodos([...todos, { id: Date.now(), text, completed: false }])
    event.currentTarget.todo.value = ''
  }

  const handleCompleteTodo = (id: number) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(newTodos)
  }

  const handleDeleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  return (
    <div className='space-y-8'>
      <h1 className='text-center text-3xl font-bold'>Todo List</h1>
      <form onSubmit={handleAddTodo} className='flex items-center gap-2'>
        <input
          type='text'
          name='todo'
          className='w-full rounded-lg border border-accent-2 bg-hong-bg py-2 px-4 transition-colors duration-300 hover:border-white focus:outline-none'
          placeholder='Add a new todo...'
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
            className={clsx(
              'flex h-12 items-center justify-between rounded-lg border border-accent-2 py-2 px-4',
              {
                ['text-gray-400 line-through']: todo.completed,
              }
            )}
          >
            <button onClick={() => handleCompleteTodo(todo.id)} type='button'>
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
  )
}

export default Todo
