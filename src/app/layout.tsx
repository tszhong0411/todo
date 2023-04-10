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
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/static/favicon/site.webmanifest',
  twitter: {
    title: site.name,
    card: 'summary_large_image',
    site: '@TszhongLai0411',
    creator: '@TszhongLai0411',
  },
  keywords: site.keywords,
  themeColor: '#000',
  creator: 'tszhong0411',
  openGraph: {
    url: `${site.url}`,
    type: 'website',
    title: site.title,
    siteName: site.title,
    description: site.description,
    locale: 'en-US',
    images: [
      {
        url: 'https://honghong.me/static/images/projects/todo/cover.png',
        width: 1200,
        height: 630,
        alt: site.description,
        type: 'image/png',
      },
    ],
  },
  icons: {
    icon: '/static/favicon/favicon.svg',
    shortcut: '/static/favicon/favicon.svg',
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
      lang='en-US'
      className={clsx(inter.variable, notoSansTC.variable, 'scroll-smooth')}
    >
      <body className='bg-hong-bg font-default text-hong-fg'>
        <Header />
        <main className='relative mx-auto min-h-[calc(100vh-64px-56px)] max-w-4xl px-8 py-24'>
          {children}
        </main>
        <Footer />
        <CustomToaster />
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout
