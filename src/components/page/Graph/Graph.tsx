'use client'

import { FC } from 'react'

import { User } from '@/modules/user'

// import { Container } from '@chakra-ui/react'

type Props = {
  user: User | null
  csrfToken: string
}

export const Graph: FC<Props> = ({ user, csrfToken }) => {
  console.log(user)
  console.log(csrfToken)
  return <div>graph</div>
}
