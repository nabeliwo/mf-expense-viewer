import { FC, useCallback, useState } from 'react'

import {
  Classification,
  ExpenseResult,
  ExpenseRowObject,
  Filters,
  calculateExpense,
  defaultFilters,
} from '@/modules/expense'

import { CsvUploader } from './CsvUploader'

type Props = {
  onRegister: (expenseResult: ExpenseResult) => void
}

export const CsvUploaderAdapter: FC<Props> = ({ onRegister }) => {
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  const handleRegister = useCallback(
    (
      checkList: Array<Classification | undefined>,
      rows: ExpenseRowObject[],
    ) => {
      const result = calculateExpense(checkList, rows)
      onRegister(result)
    },
    [onRegister],
  )

  return (
    <CsvUploader
      filters={filters}
      onChangeFilters={(filters) => {
        setFilters(filters)
      }}
      onRegister={handleRegister}
      onCloseModal={() => {
        setFilters(defaultFilters)
      }}
    />
  )
}
