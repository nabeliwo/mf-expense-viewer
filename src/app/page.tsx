import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { Home } from '@/components/page/Home'
import { path } from '@/constants'
import { User } from '@/modules/user'

const HomePage = () => {
  const csrfToken = headers().get('X-CSRF-Token') || ''
  const userCookie = cookies().get('user')?.value
  const user: User = userCookie ? JSON.parse(userCookie) : null

  if (user) {
    redirect(path.dashboard)
  }

  return <Home csrfToken={csrfToken} />
}

export default HomePage
