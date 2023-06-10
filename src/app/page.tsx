import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { Home } from '@/components/page/Home'
import { path } from '@/constants'

const HomePage = () => {
  const csrfToken = headers().get('X-CSRF-Token') || ''
  const user = cookies().get('user')?.value ?? null

  if (user) {
    redirect(path.month)
  }

  return <Home csrfToken={csrfToken} />
}

export default HomePage
