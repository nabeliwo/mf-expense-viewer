import { FC } from 'react'

type Props = {
  filters: [number, number, string][][]
  file: File
}

export const Page2: FC<Props> = ({ filters, file }) => {
  console.log('-------------------')
  console.log(filters)
  console.log(file)
  return <p>Page 2</p>
}
