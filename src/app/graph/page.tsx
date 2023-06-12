import { headers, cookies } from 'next/headers'

import { Graph } from '@/components/page/Graph'
import { User } from '@/modules/user'

const GraphPage = () => {
  const csrfToken = headers().get('X-CSRF-Token') || ''
  const userCookie = cookies().get('user')?.value
  const user: User = userCookie ? JSON.parse(userCookie) : null

  return <Graph user={user} csrfToken={csrfToken} />
}

export default GraphPage
