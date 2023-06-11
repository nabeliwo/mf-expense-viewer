import { headers, cookies } from 'next/headers'

import { ApplicationLayout } from '@/components/layout/ApplicationLayout'
import { Home } from '@/components/page/Home'
import { User } from '@/modules/user'

const HomePage = () => {
  const csrfToken = headers().get('X-CSRF-Token') || ''
  const userCookie = cookies().get('user')?.value
  const user: User = userCookie ? JSON.parse(userCookie) : null

  return (
    <ApplicationLayout user={user} csrfToken={csrfToken}>
      <Home user={user} csrfToken={csrfToken} />
    </ApplicationLayout>
  )
}

export default HomePage
