'use client'

import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FC, useCallback } from 'react'

import { path } from '@/constants'
import { login } from '@/modules/user'

type Props = {
  csrfToken: string
}

export const LoginButton: FC<Props> = ({ csrfToken }) => {
  const router = useRouter()

  const handleClick = useCallback(async () => {
    await login(csrfToken)
    router.push(path.dashboard)
  }, [csrfToken, router])

  return (
    <Button colorScheme="blue" size="lg" onClick={() => handleClick()}>
      ログインして使う
    </Button>
  )
}
