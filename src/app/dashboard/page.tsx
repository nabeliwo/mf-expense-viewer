import { headers, cookies } from 'next/headers'

import { Dashboard } from '@/components/page/Dashboard'
import { path } from '@/constants'
import { User } from '@/modules/user'

const DashboardPage = () => {
  const csrfToken = headers().get('X-CSRF-Token') || ''
  const userCookie = cookies().get('user')?.value
  const user: User = userCookie ? JSON.parse(userCookie) : null

  if (!user) {
    return null
  }

  return <Dashboard />
}

export default DashboardPage
