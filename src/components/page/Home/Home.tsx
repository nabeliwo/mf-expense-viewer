'use client'

import {
  Flex,
  Button,
  Heading,
  Center,
  Text,
  Stack,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Card,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FC, useCallback, useEffect, useState } from 'react'

import { CsvUploaderAdapter } from '@/components/model/expense/CsvUploader'
import { path } from '@/constants'
import { ExpenseResult } from '@/modules/expense'
import { User, login } from '@/modules/user'

type Props = {
  user: User | null
  csrfToken: string
}

export const Home: FC<Props> = ({ user, csrfToken }) => {
  const [expenseResult, setExpenseResult] = useState<ExpenseResult | null>(null)
  const month = useSearchParams().get('month')
  const today = dayjs(month ?? undefined)
  const currentMonth = today.format('YYYY/MM')

  const handleClickLoginAndStore = useCallback(async () => {
    const user = await login(csrfToken)
    console.log('------------ ここで DB 登録する -----------------')
    console.log(user)
  }, [csrfToken])

  useEffect(() => {
    if (expenseResult && user) {
      console.log('------------ ここで DB 登録する -----------------')
      console.log(expenseResult)
      // router.refresh()
    }
  }, [expenseResult, user])

  useEffect(() => {
    setExpenseResult(null)
  }, [currentMonth])

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

        <Heading>{currentMonth}</Heading>

        <Button
          as={NextLink}
          href={`${path.root}?month=${today.add(1, 'month').format('YYYY-MM')}`}
          variant="outline"
        >
          来月
        </Button>
      </Flex>

      <Center padding={20}>
        {expenseResult ? (
          <Stack spacing="6">
            <Card>
              <TableContainer>
                <Table size="lg">
                  <Thead>
                    <Tr>
                      <Th />
                      <Th>基礎生活費</Th>
                      <Th>ゆとり費</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Th>月</Th>
                      <Td isNumeric>{expenseResult.baseByMonth}</Td>
                      <Td isNumeric>{expenseResult.luxuryByMonth}</Td>
                    </Tr>
                    <Tr>
                      <Th>不定期</Th>
                      <Td isNumeric>{expenseResult.baseIrregular}</Td>
                      <Td isNumeric>{expenseResult.luxuryIrregular}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Card>

            {!user && (
              <Button onClick={() => handleClickLoginAndStore()}>
                ログインしてデータを保存する
              </Button>
            )}
          </Stack>
        ) : (
          <Text fontSize="2xl" fontWeight="bold">
            まだデータが登録されていません。
          </Text>
        )}
      </Center>

      <Center>
        <Stack align="center" spacing="8">
          <CsvUploaderAdapter
            onRegister={(result) => setExpenseResult(result)}
          />

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
