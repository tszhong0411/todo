import { cx } from '@tszhong0411/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import '@/styles/globals.css'

import Footer from '@/components/footer'
import Header from '@/components/header'

import { site } from '@/config/site'

import Providers from './providers'

type RootLayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
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
    site: '@tszhong0411',
    creator: '@tszhong0411',
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

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props

  return (
    <html lang='en-US' className={cx(inter.variable, 'dark scroll-smooth')}>
      <body className='bg-accent-bg font-default text-accent-fg'>
        <Providers>
          <Header />
          <main className='relative mx-auto min-h-[calc(100vh-64px-56px)] max-w-4xl px-8 py-24'>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
