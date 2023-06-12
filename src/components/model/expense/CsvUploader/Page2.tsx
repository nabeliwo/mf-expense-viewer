import {
  Stack,
  Table,
  Thead,
  Tbody,
  Text,
  Tr,
  Th,
  Td,
  TableContainer,
  Radio,
  RadioGroup,
  Checkbox,
  Spinner,
  Center,
} from '@chakra-ui/react'
import csvParser from 'csv-parser'
import { FC, useCallback, useEffect, useState } from 'react'

import {
  ExpenseRowObject,
  Filters,
  expenseRow,
  filterRow,
} from '@/modules/expense'

type Props = {
  filters: Filters
  file: File
}

export const Page2: FC<Props> = ({ filters, file }) => {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState<ExpenseRowObject[] | null>(null)
  const [visibleColumns, setVisibleColumns] = useState(
    Array.from({ length: 10 }).map(() => true),
  )

  if (list) {
    console.log('----------------------------')
    console.log(list.length)
  }

  const handleChangeVisibleColumn = useCallback(
    (i: number, checked: boolean) => {
      const newArray = visibleColumns.concat()

      newArray[i] = checked

      setVisibleColumns(newArray)
    },
    [visibleColumns, setVisibleColumns],
  )

  useEffect(() => {
    setList(null)

    const reader = new FileReader()

    reader.onload = (e) => {
      if (e.target) {
        const stream = csvParser()

        stream.on('data', (data: ExpenseRowObject) => {
          if (filterRow(data, filters)) {
            setList((prev) => {
              const newArray = prev ? [...prev, data] : [data]
              return newArray
            })
          }
        })

        stream.write(e.target.result)
      }
    }

    reader.readAsText(file, 'shift-jis')
  }, [file, filters])

  useEffect(() => {
    if (list !== null) {
      setLoading(false)
    }
  }, [list])

  return (
    <Stack>
      <Text fontWeight="bold" fontSize="lg">
        計算対象取引一覧
      </Text>

      <Stack spacing="4" direction="row">
        <Text>表示する列:</Text>
        {expenseRow.map((name, i) => (
          <Checkbox
            key={i}
            isChecked={visibleColumns[i]}
            onChange={(e) => handleChangeVisibleColumn(i, e.target.checked)}
          >
            {name}
          </Checkbox>
        ))}
      </Stack>

      <TableContainer>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th />
              {expenseRow.map((name, i) => {
                if (!visibleColumns[i]) {
                  return null
                }

                return <Th key={i}>{name}</Th>
              })}
            </Tr>
          </Thead>

          <Tbody>
            {loading ? (
              <Tr>
                <Td colSpan={11}>
                  <Center minH="200px">
                    <Spinner size="lg" />
                  </Center>
                </Td>
              </Tr>
            ) : list && list.length === 0 ? (
              <Tr>
                <Td colSpan={11}>取引が1件も見つかりませんでした。</Td>
              </Tr>
            ) : (
              list &&
              list.map((item, i) => (
                <Tr key={i}>
                  <Td>
                    <RadioGroup value="1" onChange={(e) => console.log(e)}>
                      <Stack>
                        <Radio value="1" size="sm">
                          基礎生活費/毎月
                        </Radio>
                        <Radio value="2" size="sm">
                          ゆとり費/毎月
                        </Radio>
                        <Radio value="3" size="sm">
                          基礎生活費/不定期
                        </Radio>
                        <Radio value="4" size="sm">
                          ゆとり費/不定期
                        </Radio>
                        <Radio value="5" size="sm">
                          無視
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </Td>
                  {expenseRow.map((name, j) => {
                    if (!visibleColumns[j]) {
                      return null
                    }

                    if (j === 2) {
                      return (
                        <Td key={`${i}-${j}`}>
                          <Text maxW="300px" noOfLines={1}>
                            {item[name]}
                          </Text>
                        </Td>
                      )
                    }

                    return <Td key={`${i}-${j}`}>{item[name]}</Td>
                  })}
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  )
}
