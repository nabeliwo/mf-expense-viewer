import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const {
    user,
  }: {
    user: {
      id: string
      name: string
    }
  } = await req.json()

  const maxAge = 60 * 60 * 24 * 5 * 1000 // 5日

  cookies().set('user', JSON.stringify(user), { maxAge })

  return NextResponse.json(user)
}

export const DELETE = async () => {
  cookies().delete('user')
  return NextResponse.json({ status: 'ok' })
}
