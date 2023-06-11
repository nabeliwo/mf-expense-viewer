'use client'

import {
  Flex,
  Button,
  Heading,
  Center,
  Text,
  Stack,
  Link,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'

import { CsvUploader } from '@/components/model/expense/CsvUploader'
import { path } from '@/constants'
import { User } from '@/modules/user'

type Props = {
  user: User | null
  csrfToken: string
}

export const Home: FC<Props> = ({ user, csrfToken }) => {
  const month = useSearchParams().get('month')
  const today = dayjs(month ?? undefined)

  return (
    <>
      <Flex align="center" justify="center" gap={6}>
        <Button
          as={NextLink}
          href={`${path.root}?month=${today
            .subtract(1, 'month')
            .format('YYYY-MM')}`}
          variant="outline"
        >
          前月
        </Button>

        <Heading>{today.format('YYYY/MM')}</Heading>

        <Button
          as={NextLink}
          href={`${path.root}?month=${today.add(1, 'month').format('YYYY-MM')}`}
          variant="outline"
        >
          来月
        </Button>
      </Flex>

      <Center padding={20}>
        <Text fontSize="2xl" fontWeight="bold">
          まだデータが登録されていません。
        </Text>
      </Center>

      <Center>
        <Stack align="center" spacing="8">
          <CsvUploader />

          <Link
            as={NextLink}
            href={`${path.graph}?month=${today.format('YYYY-MM')}`}
            color="blue.500"
          >
            統計データを見る
          </Link>
        </Stack>
      </Center>

      <p>user: {user ? user.name : 'no user'}</p>
      <p>csrfToken: {csrfToken}</p>
    </>
  )
}
