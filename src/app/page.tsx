import { headers, cookies } from 'next/headers'

import { Home } from '@/components/page/Home'

const HomePage = () => {
  const csrfToken = headers().get('X-CSRF-Token') || ''
  const hoge = cookies().get('userId')?.value ?? null

  console.log('---------- cookie userId --------')
  console.log(hoge)

  return <Home csrfToken={csrfToken} />
}

export default HomePage
