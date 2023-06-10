import { Button } from '@chakra-ui/react'
import { FC, useCallback } from 'react'

import { login } from '@/modules/user'

type Props = {
  csrfToken: string
}

export const LoginButton: FC<Props> = ({ csrfToken }) => {
  const handleClick = useCallback(() => {
    login(csrfToken)
  }, [csrfToken])

  return (
    <Button colorScheme="blue" size="lg" onClick={() => handleClick()}>
      ログインして使う
    </Button>
  )
}
