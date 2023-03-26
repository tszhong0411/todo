import { IconDescriptor } from 'next/dist/lib/metadata/types/metadata-types'

import { isProduction } from '@/lib/constants'

type Site = {
  url: string
  title: string
  name: string
  titleTemplate: string
  description: string
  favicons: IconDescriptor[]
}

export const site: Site = {
  url: isProduction ? 'https://todo.honghong.me' : 'http://localhost:3000',
  title: '小康 Todo',
  name: '小康',
  titleTemplate: '- 小康 Todo',
  description: '每個 Web 開發人員都會建立的項目 - Todo',
  favicons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/static/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/static/favicon/favicon-32x32.png',
    },
  ],
}
