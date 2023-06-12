type Filter = [
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
  0 | 1 | 2 | 3 | 4 | 5,
  string,
]
export type Filters = Filter[][]

export type ExpenseRowObject = {
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
