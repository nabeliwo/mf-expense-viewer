import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const {
    user,
  }: {
    user: {
      idToken: string
      displayName: string
      email: string
    }
  } = await req.json()

  // Set session expiration to 5 days.
  const maxAge = 60 * 60 * 24 * 5 * 1000

  cookies().set('userId', user.idToken, { maxAge })

  console.log('----------------------------------')
  console.log(user)

  return NextResponse.json(user)
}
