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
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react'
import csvParser from 'csv-parser'
import { FC, useCallback, useEffect, useState } from 'react'

import {
  ExpenseRowObject,
  Filters,
  expenseRow,
  filterRow,
  Classification,
  classification,
} from '@/modules/expense'

type Props = {
  filters: Filters
  file: File
  onClickPrev: () => void
  onClickRegister: (
    checkList: Array<Classification | undefined>,
    rows: ExpenseRowObject[],
  ) => void
}

export const ModalCheckPage: FC<Props> = ({
  filters,
  file,
  onClickPrev,
  onClickRegister,
}) => {
  const [loading, setLoading] = useState(true)
  const [expenseList, setExpenseList] = useState<ExpenseRowObject[] | null>(
    null,
  )
  const [visibleColumns, setVisibleColumns] = useState(
    Array.from({ length: 10 }).map(() => true),
  )
  const [checkList, setCheckList] = useState<Array<Classification | undefined>>(
    [],
  )

  const handleChangeVisibleColumn = useCallback(
    (i: number, checked: boolean) => {
      const newArray = visibleColumns.concat()

      newArray[i] = checked

      setVisibleColumns(newArray)
    },
    [visibleColumns, setVisibleColumns],
  )
  const handleChangeCheckList = useCallback(
    (i: number, value: string) => {
      const newArray = checkList.concat()

      newArray[i] = Number(value) as Classification

      setCheckList(newArray)
    },
    [checkList],
  )
  const handleClickRegister = useCallback(() => {
    if (expenseList) {
      onClickRegister(checkList, expenseList)
    }
  }, [onClickRegister, checkList, expenseList])

  useEffect(() => {
    setExpenseList(null)

    const reader = new FileReader()

    reader.onload = (e) => {
      if (e.target) {
        const stream = csvParser()

        stream.on('data', (data: ExpenseRowObject) => {
          if (filterRow(data, filters)) {
            setExpenseList((prev) => {
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
    if (expenseList !== null) {
      setLoading(false)
      setCheckList(Array.from({ length: expenseList.length }))
    }
  }, [expenseList])

  return (
    <>
      <ModalBody>
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
                ) : expenseList && expenseList.length === 0 ? (
                  <Tr>
                    <Td colSpan={11}>取引が1件も見つかりませんでした。</Td>
                  </Tr>
                ) : (
                  expenseList &&
                  expenseList.map((item, i) => (
                    <Tr key={i}>
                      <Td>
                        <RadioGroup
                          value={
                            checkList[i] !== undefined
                              ? String(checkList[i])
                              : undefined
                          }
                          onChange={(value) => handleChangeCheckList(i, value)}
                        >
                          <Stack>
                            {classification.map((name, value) => (
                              <Radio
                                key={`${i}-${value}`}
                                value={String(value)}
                                size="sm"
                              >
                                {name}
                              </Radio>
                            ))}
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
      </ModalBody>

      <ModalFooter>
        <Button mr={3} onClick={() => onClickPrev()}>
          前へ
        </Button>

        <Button colorScheme="blue" onClick={() => handleClickRegister()}>
          登録
        </Button>
      </ModalFooter>
    </>
  )
}
