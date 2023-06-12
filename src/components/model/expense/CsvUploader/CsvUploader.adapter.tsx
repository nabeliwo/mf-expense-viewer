import { useCallback, useState } from 'react'

import { Filters, defaultFilters } from '@/modules/expense'

import { CsvUploader } from './CsvUploader'

export const CsvUploaderAdapter = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  const handleRegister = useCallback(() => {
    console.log('--------------------------')
    console.log('登録')
  }, [])

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
