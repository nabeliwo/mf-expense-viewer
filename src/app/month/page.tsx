import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { path } from '@/constants'

const Month = () => {
  const csrfToken = headers().get('X-CSRF-Token') || ''
  const user = cookies().get('user')?.value ?? null

  // console.log(csrfToken)

  if (!user) {
    redirect(path.root)
  }

  return <h1>Month</h1>
}

export default Month
