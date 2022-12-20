'use client'

import { usePathname } from 'next/navigation'
import { NextSeo, NextSeoProps } from 'next-seo'

import { favicons } from '@/lib/favicons'

type HeadProps = NextSeoProps

const Head = (props: HeadProps) => {
  const pathname = usePathname()
  const {
    title,
    description = '小康 - 16 yrs • Student • Fullstack Web developer (student)',
    ...rest
  } = props

  return (
    <>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width' />
      <NextSeo
        useAppDir={true}
        titleTemplate='%s | TODO'
        title={title}
        defaultTitle='小康 – TODO'
        description={description}
        canonical={`https://todo.honghong.me${pathname}`}
        twitter={{
          cardType: 'summary_large_image',
          site: '@TszhongLai0411',
          handle: '@TszhongLai0411',
        }}
        openGraph={{
          url: `https://todo.honghong.me${pathname}`,
          type: 'website',
          title: title ?? '小康 – Developer, YouTuber',
          description,
          images: [
            {
              url: 'https://todo.honghong.me/static/og.png',
              width: 1600,
              height: 960,
              alt: description,
            },
          ],
        }}
        additionalLinkTags={[...favicons]}
        {...rest}
      />
    </>
  )
}

export default Head
