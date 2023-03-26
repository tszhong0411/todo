import { Analytics } from '@vercel/analytics/react'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { Inter, Noto_Sans_TC } from 'next/font/google'
import React from 'react'

import '@/styles/globals.css'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

import { site } from '@/config/site'

import CustomToaster from './custom-toaster'
import Providers from './providers'

import { WithChildren } from '@/types'

type RootLayoutProps = WithChildren

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s ${site.titleTemplate}`,
  },
  description: site.description,
  robots: {
    index: true,
    follow: true,
  },
  manifest: `${site.url}/static/favicon/site.webmanifest`,
  twitter: {
    title: site.name,
    card: 'summary_large_image',
    site: '@TszhongLai0411',
    creator: '@TszhongLai0411',
  },
  openGraph: {
    url: `${site.url}`,
    type: 'website',
    title: site.title,
    siteName: site.title,
    description: site.description,
    locale: 'zh-TW',
    images: [
      {
        url: `https://honghong.me/static/images/projects/todo/cover.png`,
        width: 1600,
        height: 960,
        alt: site.description,
      },
    ],
  },
  icons: {
    icon: '/static/favicon/favicon.svg',
    apple: [
      {
        url: '/static/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [...site.favicons],
  },
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
})

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props

  return (
    <html
      lang='zh-TW'
      className={clsx(inter.variable, notoSansTC.variable, 'scroll-smooth')}
    >
      <body className='bg-zinc-900 font-default text-white'>
        <Providers>
          <Header />
          <main className='relative mx-auto min-h-[calc(100vh-64px-56px)] max-w-4xl px-8 py-24'>
            {children}
          </main>
          <Footer />
          <CustomToaster />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout
