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

type Props = {
  filters: [number, number, string][][]
  file: File
}

type RowObject = {
  計算対象: string
  日付: string
  内容: string
  '金額（円）': string
  保有金融機関: string
  大項目: string
  中項目: string
  メモ: string
  振替: string
  ID: string
}

const filterRow = (rowObj: RowObject, filters: Props['filters']) => {
  return true
}

export const Page2: FC<Props> = ({ filters, file }) => {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState<RowObject[]>([])
  const [visibleColumns, setVisibleColumns] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ])
  const handleChangeVisibleColumn = useCallback(
    (i: number, checked: boolean) => {
      setVisibleColumns(
        visibleColumns.map((item, index) => {
          if (index === i) {
            return checked
          }

          return item
        }),
      )
    },
    [visibleColumns, setVisibleColumns],
  )

  useEffect(() => {
    const reader = new FileReader()

    reader.onload = (e) => {
      if (e.target) {
        const filteredList: RowObject[] = []
        const stream = csvParser()

        stream.on('data', (data: RowObject) => {
          if (filterRow(data, filters)) {
            filteredList.push(data)
          }

          setList(filteredList)
          setLoading(false)
        })

        stream.write(e.target.result)
      }
    }

    reader.readAsText(file, 'shift-jis')
  }, [file, filters])

  return (
    <Stack>
      <Text fontWeight="bold" fontSize="lg">
        計算対象取引一覧
      </Text>

      <Stack spacing="4" direction="row">
        <Text>表示する列:</Text>
        <Checkbox
          isChecked={visibleColumns[0]}
          onChange={(e) => handleChangeVisibleColumn(0, e.target.checked)}
        >
          計算対象
        </Checkbox>
        <Checkbox
          isChecked={visibleColumns[1]}
          onChange={(e) => handleChangeVisibleColumn(1, e.target.checked)}
        >
          日付
        </Checkbox>
        <Checkbox
          isChecked={visibleColumns[2]}
          onChange={(e) => handleChangeVisibleColumn(2, e.target.checked)}
        >
          内容
        </Checkbox>
        <Checkbox
          isChecked={visibleColumns[3]}
          onChange={(e) => handleChangeVisibleColumn(3, e.target.checked)}
        >
          金額（円）
        </Checkbox>
        <Checkbox
          isChecked={visibleColumns[4]}
          onChange={(e) => handleChangeVisibleColumn(4, e.target.checked)}
        >
          保有金融機関
        </Checkbox>
        <Checkbox
          isChecked={visibleColumns[5]}
          onChange={(e) => handleChangeVisibleColumn(5, e.target.checked)}
        >
          大項目
        </Checkbox>
        <Checkbox
          isChecked={visibleColumns[6]}
          onChange={(e) => handleChangeVisibleColumn(6, e.target.checked)}
        >
          中項目
        </Checkbox>
        <Checkbox
          isChecked={visibleColumns[7]}
          onChange={(e) => handleChangeVisibleColumn(7, e.target.checked)}
        >
          メモ
        </Checkbox>
        <Checkbox
          isChecked={visibleColumns[8]}
          onChange={(e) => handleChangeVisibleColumn(8, e.target.checked)}
        >
          振替
        </Checkbox>
        <Checkbox
          isChecked={visibleColumns[9]}
          onChange={(e) => handleChangeVisibleColumn(9, e.target.checked)}
        >
          ID
        </Checkbox>
      </Stack>

      <TableContainer>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th />
              {visibleColumns[0] && (
                <Th>
                  計算
                  <br />
                  対象
                </Th>
              )}
              {visibleColumns[1] && <Th>日付</Th>}
              {visibleColumns[2] && <Th>内容</Th>}
              {visibleColumns[3] && <Th>金額（円）</Th>}
              {visibleColumns[4] && <Th>保有金融機関</Th>}
              {visibleColumns[5] && <Th>大項目</Th>}
              {visibleColumns[6] && <Th>中項目</Th>}
              {visibleColumns[7] && <Th>メモ</Th>}
              {visibleColumns[8] && <Th>振替</Th>}
              {visibleColumns[9] && <Th>ID</Th>}
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
            ) : list.length === 0 ? (
              <Tr>
                <Td colSpan={11}>取引が1件も見つかりませんでした。</Td>
              </Tr>
            ) : (
              list.map((item) => (
                <Tr key={item['ID']}>
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
                  {visibleColumns[0] && <Td>{item['計算対象']}</Td>}
                  {visibleColumns[1] && <Td>{item['日付']}</Td>}
                  {visibleColumns[2] && (
                    <Td>
                      <Text maxW="200px" noOfLines={1}>
                        {item['内容']}
                      </Text>
                    </Td>
                  )}
                  {visibleColumns[3] && <Td>{item['金額（円）']}</Td>}
                  {visibleColumns[4] && <Td>{item['保有金融機関']}</Td>}
                  {visibleColumns[5] && <Td>{item['大項目']}</Td>}
                  {visibleColumns[6] && <Td>{item['中項目']}</Td>}
                  {visibleColumns[7] && <Td>{item['メモ']}</Td>}
                  {visibleColumns[8] && <Td>{item['振替']}</Td>}
                  {visibleColumns[9] && <Td>{item['ID']}</Td>}
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  )
}
