'use client'

import { Toaster } from 'react-hot-toast'

const CustomToaster = () => {
  return (
    <Toaster
      position='bottom-right'
      toastOptions={{
        className: 'bg-zinc-700 text-white border border-zinc-500',
      }}
    />
  )
}

export default CustomToaster
