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
import { useSearchParams, useRouter } from 'next/navigation'
import { FC, useCallback, useEffect, useState } from 'react'

import { CsvUploaderAdapter } from '@/components/model/expense/CsvUploader'
import { path } from '@/constants'
import { ExpenseResult, createExpense } from '@/modules/expense'
import { User, login } from '@/modules/user'

type Props = {
  user: User | null
  csrfToken: string
  defaultExpense: ExpenseResult | null
}

export const Home: FC<Props> = ({ user, csrfToken, defaultExpense }) => {
  const [expenseResult, setExpenseResult] = useState<ExpenseResult | null>(
    defaultExpense,
  )
  const month = useSearchParams().get('month')
  const router = useRouter()
  const today = dayjs(month ?? undefined)
  const currentMonthKey = today.format('YYYY-MM')

  const handleRegister = useCallback(
    (result: ExpenseResult) => {
      setExpenseResult(result)

      if (user) {
        createExpense(user.id, currentMonthKey, result)
      }
    },
    [user, currentMonthKey],
  )

  const handleClickLoginAndStore = useCallback(async () => {
    if (!expenseResult) {
      return
    }

    const user = await login(csrfToken)

    createExpense(user.id, currentMonthKey, expenseResult).then(() => {
      router.refresh()
    })
  }, [expenseResult, csrfToken, currentMonthKey, router])

  useEffect(() => {
    setExpenseResult(defaultExpense)
  }, [defaultExpense])

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
          <CsvUploaderAdapter onRegister={handleRegister} />

          <Link
            as={NextLink}
            href={`${path.graph}?month=${today.format('YYYY-MM')}`}
            color="blue.500"
          >
            統計データを見る
          </Link>
        </Stack>
      </Center>
    </>
  )
}
