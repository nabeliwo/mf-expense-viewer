'use client'

import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FC, useCallback } from 'react'

import { login } from '@/modules/user'

type Props = {
  csrfToken: string
}

export const LoginButton: FC<Props> = ({ csrfToken }) => {
  const router = useRouter()

  const handleClick = useCallback(async () => {
    await login(csrfToken)
    router.refresh()
  }, [csrfToken, router])

  return <Button onClick={() => handleClick()}>ログイン</Button>
}
