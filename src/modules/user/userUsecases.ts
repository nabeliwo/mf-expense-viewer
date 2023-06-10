import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { path } from '@/constants'
import { httpRequest } from '@/gateways/httpRequest'
import { signIn } from '@/libs/firebase'

export const login = async (csrfToken: string) => {
  const user = await signIn()
  const data = await httpRequest.post(path.api.auth, {
    user,
    csrf_token: csrfToken,
  })

  console.log('----------------------')
  console.log(data)
}
