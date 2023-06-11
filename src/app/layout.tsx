import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { FC, ReactNode } from 'react'

import { Providers } from './providers'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

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
