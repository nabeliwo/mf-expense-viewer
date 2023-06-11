'use client'

import { Container, Center, Text, Link } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

import { User } from '@/modules/user'

import { Header } from '../Header'

type Props = {
  user: User | null
  csrfToken: string
  children: ReactNode
}

export const ApplicationLayout: FC<Props> = ({ user, csrfToken, children }) => (
  <>
    <Header user={user} csrfToken={csrfToken} />

    <main>
      <Container maxW="1200px" minH="calc(100vh - 72px - 88px)" paddingTop={8}>
        {children}
      </Container>
    </main>

    <footer>
      <Center padding={8} fontWeight="bold">
        <Text>
          © 2023{' '}
          <Link href="https://nabeliwo.com" isExternal>
            nabeliwo
          </Link>
        </Text>
      </Center>
    </footer>
  </>
)
