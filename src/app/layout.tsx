import { Inter } from '@next/font/google'
import clsx from 'clsx'
import React from 'react'

import '@/styles/globals.css'

import CustomToaster from '@/components/CustomToaster'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

import { WithChildren } from '@/types'

type RootLayoutProps = WithChildren

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props

  return (
    <html lang='en' className={clsx(inter.variable, 'scroll-smooth')}>
      <head />
      <body className='bg-zinc-900 font-default text-white'>
        <Header />
        <main className='relative mx-auto min-h-[calc(100vh-64px-56px)] max-w-4xl px-8 py-24'>
          {children}
        </main>
        <Footer />
        <CustomToaster />
      </body>
    </html>
  )
}

export default RootLayout
