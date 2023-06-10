import { FC, ReactNode } from 'react'

import { Providers } from './providers'

export const metadata = {
  title:
    'Money forward の家計簿データ CSV を使って月ごとの支出を基礎生活費とゆとり費にわける君',
  description: '個人の資産目標を達成するための助けになるツールです。',
}

type Props = {
  children: ReactNode
}

const RootLayout: FC<Props> = ({ children }) => (
  <html lang="ja">
    <body>
      <Providers>{children}</Providers>
    </body>
  </html>
)

export default RootLayout
