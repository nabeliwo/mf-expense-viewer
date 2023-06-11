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
import { FC, Fragment, useRef } from 'react'
import { FiFile } from 'react-icons/fi'

type Props = {
  filters: [number, number, string][][]
  fileName: string
  onSetFile: (file: File) => void
  onChangeFilter: (i: number, j: number, k: number, value: string) => void
  onClickAddAnd: (i: number) => void
  onClickAddOr: () => void
  onClickDelete: (i: number, j: number) => void
}

export const Page1: FC<Props> = ({
  filters,
  fileName,
  onSetFile,
  onChangeFilter,
  onClickAddAnd,
  onClickAddOr,
  onClickDelete,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

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
        <FormLabel fontWeight="bold">フィルター条件</FormLabel>

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
                            onChangeFilter(i, j, 0, e.target.value)
                          }}
                        >
                          <option value="0">計算対象</option>
                          <option value="1">日付</option>
                          <option value="2">内容</option>
                          <option value="3">金額(円)</option>
                          <option value="4">保有金融機関</option>
                          <option value="5">大項目</option>
                          <option value="6">中項目</option>
                          <option value="7">メモ</option>
                          <option value="8">振替</option>
                          <option value="9">ID</option>
                        </Select>

                        <Select
                          width="130px"
                          bg="white"
                          value={item[1]}
                          onChange={(e) => {
                            onChangeFilter(i, j, 1, e.target.value)
                          }}
                        >
                          <option value="0">＝</option>
                          <option value="1">≠</option>
                          <option value="2">＞</option>
                          <option value="3">＜</option>
                          <option value="4">が次を含む</option>
                          <option value="5">が次を含まない</option>
                        </Select>

                        <Input
                          type="text"
                          value={item[2]}
                          flex="1"
                          bg="white"
                          placeholder="入力してください"
                          onChange={(e) => {
                            onChangeFilter(i, j, 2, e.target.value)
                          }}
                        />

                        <Button
                          variant="outline"
                          bg="white"
                          onClick={() => onClickDelete(i, j)}
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
            onClick={() => onClickAddAnd(filters.length - 1)}
          >
            AND を追加
          </Button>
          <Button variant="outline" onClick={() => onClickAddOr()}>
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
