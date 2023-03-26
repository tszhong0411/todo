import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'react-hot-toast'

const Form = () => {
  const [value, setValue] = React.useState('')
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: async () => {
      const loading = toast.loading('新增中 ...')

      const res = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ text: value }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        toast.dismiss(loading)
        toast.error('發生了錯誤')
        return
      }

      setValue('')
      toast.dismiss(loading)
      toast.success('新增成功')
      queryClient.invalidateQueries(['tasks'])
    },
  })

  return (
    <div className='relative'>
      <input
        type='text'
        className='my-8 w-full rounded-lg border border-zinc-600 bg-zinc-700 p-4 text-sm text-white placeholder-gray-400 outline-none focus:border-zinc-500'
        placeholder='需要做什麼？'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className='absolute top-10 right-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white outline-none transition-colors duration-300 hover:bg-blue-700'
        onClick={() => {
          if (!value) return toast.error('請輸入內容')

          mutate()
        }}
      >
        新增
      </button>
    </div>
  )
}

export default Form
