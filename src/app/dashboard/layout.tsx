import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { FC, ReactNode } from 'react'

import { Header } from '@/components/layout/Header'
import { path } from '@/constants'
import { User } from '@/modules/user'

type Props = {
  children: ReactNode
}

const DashboardLayout: FC<Props> = ({ children }) => {
  const userCookie = cookies().get('user')?.value
  const user: User = userCookie ? JSON.parse(userCookie) : null

  if (!user) {
    redirect(path.root)
  }

  return (
    <>
      <Header user={user} />
      {children}
    </>
  )
}

export default DashboardLayout
