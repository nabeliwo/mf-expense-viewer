import { ExpenseRowObject, Filters } from './expenseType'

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
