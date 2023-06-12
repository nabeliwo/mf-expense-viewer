import { cookies, headers } from 'next/headers'
import { FC, ReactNode } from 'react'

import { ApplicationLayout } from '@/components/layout/ApplicationLayout'
import { User } from '@/modules/user'

type Props = {
  children: ReactNode
}

const GraphLayout: FC<Props> = ({ children }) => {
  const csrfToken = headers().get('X-CSRF-Token') || ''
  const userCookie = cookies().get('user')?.value
  const user: User = userCookie ? JSON.parse(userCookie) : null

  return (
    <ApplicationLayout user={user} csrfToken={csrfToken}>
      {children}
    </ApplicationLayout>
  )
}

export default GraphLayout
