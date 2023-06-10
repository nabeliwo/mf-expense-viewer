import { path } from '@/constants'
import { httpRequest } from '@/gateways/httpRequest'
import { signIn } from '@/libs/firebase'

import { User } from './userTypes'

export const login = async (csrfToken: string) => {
  const user = await signIn()
  const data = await httpRequest.post<User>(path.api.auth, {
    user,
    csrf_token: csrfToken,
  })

  return data
}
