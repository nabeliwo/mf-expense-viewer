'use client'

import { DeleteIcon } from '@chakra-ui/icons'
import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  Icon,
  InputLeftElement,
  Stack,
  Select,
  Flex,
  Box,
  Center,
  Text,
} from '@chakra-ui/react'
import { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { FiFile } from 'react-icons/fi'

import { Filters, conditionRow, expenseRow } from '@/modules/expense'

type Props = {
  filters: Filters
  fileName: string
  onSetFile: (file: File) => void
  onChangeFilters: (filters: Filters) => void
}

export const Page1: FC<Props> = ({
  fileName,
  filters: defaultFilters,
  onSetFile,
  onChangeFilters,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  const handleChangeFilter = useCallback(
    (i: number, j: number, k: number, value: string) => {
      const newArray = filters.concat()

      newArray[i][j][k] = value

      setFilters(newArray)
    },
    [filters],
  )
  const handleAddAndFilter = useCallback(
    (i: number) => {
      const newArray = filters.concat()

      newArray[i].push([0, 0, ''])

      setFilters(newArray)
    },
    [filters],
  )
  const handleAddOrFilter = useCallback(() => {
    const newArray = filters.concat()

    newArray.push([[0, 0, '']])

    setFilters(newArray)
  }, [filters])
  const handleDeleteFilter = useCallback(
    (i: number, j: number) => {
      let newArray = filters.concat()

      newArray[i] = newArray[i].filter((_, index) => index !== j)

      if (newArray[i].length === 0) {
        newArray = newArray.filter((_, index) => index !== i)
      }

      setFilters(newArray)
    },
    [filters],
  )

  useEffect(() => {
    onChangeFilters(filters)
  }, [filters, onChangeFilters])

  return (
    <Stack spacing={6}>
      <FormControl>
        <FormLabel fontWeight="bold">CSV をアップロード</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FiFile} />
          </InputLeftElement>
          <input
            type="file"
            accept=".csv"
            ref={inputRef}
            hidden
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files) {
                onSetFile(e.target.files[0])
              }
            }}
          />
          <Input
            readOnly
            width="270px"
            value={fileName || 'ファイルを選択してください'}
            onClick={() => {
              inputRef.current?.click()
            }}
          />
        </InputGroup>
        <FormHelperText>
          Money Forward の月毎の「家計簿データの出力」からダウンロードした CSV
          をアップロードしてください。
        </FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel fontWeight="bold">除外条件</FormLabel>

        <Stack>
          {filters.map((filter, i) => (
            <Fragment key={i}>
              <Box bg="gray.300" p={2} borderRadius="md">
                <Stack>
                  {filter.map((item, j) => (
                    <Fragment key={`${i}-${j}`}>
                      <Flex gap="4">
                        <Select
                          width="130px"
                          bg="white"
                          value={item[0]}
                          onChange={(e) => {
                            handleChangeFilter(i, j, 0, e.target.value)
                          }}
                        >
                          {expenseRow.map((name, value) => (
                            <option key={value} value={value}>
                              {name}
                            </option>
                          ))}
                        </Select>

                        <Select
                          width="130px"
                          bg="white"
                          value={item[1]}
                          onChange={(e) => {
                            handleChangeFilter(i, j, 1, e.target.value)
                          }}
                        >
                          {conditionRow.map((name, value) => (
                            <option key={value} value={value}>
                              {name}
                            </option>
                          ))}
                        </Select>

                        <Input
                          type="text"
                          value={item[2]}
                          flex="1"
                          bg="white"
                          placeholder="入力してください"
                          onChange={(e) => {
                            handleChangeFilter(i, j, 2, e.target.value)
                          }}
                        />

                        <Button
                          variant="outline"
                          bg="white"
                          onClick={() => handleDeleteFilter(i, j)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Flex>

                      {filter.length - 1 > j && (
                        <Center>
                          <Text fontWeight="bold">AND</Text>
                        </Center>
                      )}
                    </Fragment>
                  ))}
                </Stack>
              </Box>

              {filters.length - 1 > i && (
                <Center>
                  <Text fontWeight="bold">OR</Text>
                </Center>
              )}
            </Fragment>
          ))}

          <Button
            variant="outline"
            isDisabled={filters.length === 0}
            onClick={() => handleAddAndFilter(filters.length - 1)}
          >
            AND を追加
          </Button>
          <Button variant="outline" onClick={() => handleAddOrFilter()}>
            OR を追加
          </Button>
        </Stack>

        <FormHelperText>
          CSV の行のうち、上記の条件に合う行は計算対象から除外されます。
          ログインをすると一度使用したフィルター条件が自動で保存されます。
        </FormHelperText>
      </FormControl>
    </Stack>
  )
}
