import {
  Classification,
  ExpenseResult,
  ExpenseRowObject,
  Filters,
} from './expenseType'

export const expenseRow = [
  '計算対象',
  '日付',
  '内容',
  '金額（円）',
  '保有金融機関',
  '大項目',
  '中項目',
  'メモ',
  '振替',
  'ID',
] as const
export const conditionRow = [
  '＝',
  '≠',
  '＞',
  '＜',
  'が次を含む',
  'が次を含まない',
] as const
export const classification = [
  '基礎生活費/毎月',
  'ゆとり費/毎月',
  '基礎生活費/不定期',
  'ゆとり費/不定期',
  '無視',
] as const

// 条件1 or 条件2
export const defaultFilters: Filters = [
  [
    [0, 0, '0'], // 条件1: 計算対象が '0' のもの
    [4, 1, 'フラット35'],
  ],
  [[3, 2, '0']], // 条件2: 金額（円）が0より上のもの(=収入)
]

export const filterRow = (rowObj: ExpenseRowObject, filters: Filters) => {
  const bool = filters.some((filter) =>
    filter.every(([object, condition, _value]) => {
      const objectValue = rowObj[expenseRow[object]]
      const value = object === 3 ? Number(_value) : _value

      // TODO: もう少ししっかり条件判定したい
      // 例えば、日付の場合は日付の条件にしたりとか
      // あと、文字列のときに > < とかは意味がないので選ばせないとかした方が良いかも
      switch (condition) {
        case 0:
          return objectValue === value

        case 1:
          return objectValue !== value

        case 2:
          return objectValue > value

        case 3:
          return objectValue < value

        case 4:
          return objectValue.includes(value as string)

        case 5:
          return !objectValue.includes(value as string)
      }
    }),
  )

  return !bool
}

export const calculateExpense = (
  checkList: Array<Classification | undefined>,
  rows: ExpenseRowObject[],
): ExpenseResult => {
  let baseByMonth = 0
  let luxuryByMonth = 0
  let baseIrregular = 0
  let luxuryIrregular = 0

  checkList.forEach((value, i) => {
    if (value !== undefined && value !== 4) {
      const item = rows[i]
      const amount = Number(item[expenseRow[3]])

      switch (value) {
        case 0:
          baseByMonth += amount
          break

        case 1:
          luxuryByMonth += amount
          break

        case 2:
          baseIrregular += amount
          break

        case 3:
          luxuryIrregular += amount
          break
      }
    }
  })

  return {
    baseByMonth: baseByMonth === 0 ? baseByMonth : -baseByMonth,
    luxuryByMonth: luxuryByMonth === 0 ? luxuryByMonth : -luxuryByMonth,
    baseIrregular: baseIrregular === 0 ? baseIrregular : -baseIrregular,
    luxuryIrregular: luxuryIrregular === 0 ? luxuryIrregular : -luxuryIrregular,
  }
}
