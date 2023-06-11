'use client'

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'

import { Page1 } from './Page1'
import { Page2 } from './Page2'

export const CsvUploader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [file, setFile] = useState<File | null>(null)
  const [page, setPage] = useState<1 | 2>(1)
  const [filters, setFilters] = useState<[number, number, string][][]>([
    [
      [0, 0, '0'],
      [4, 1, 'フラット35'],
    ],
    [[3, 2, '0']],
  ])
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
  const handleClose = useCallback(() => {
    onClose()
    setFile(null)
    setPage(1)
  }, [onClose])

  return (
    <>
      <Button colorScheme="blue" size="lg" onClick={onOpen}>
        MF CSV をアップロードしてデータを登録する
      </Button>

      <Modal
        isOpen={isOpen}
        size="2xl"
        closeOnOverlayClick={false}
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>CSV からデータを登録する ({page}/2)</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {page === 1 && (
              <Page1
                filters={filters}
                fileName={file?.name ?? ''}
                onSetFile={(file: File) => setFile(file)}
                onChangeFilter={handleChangeFilter}
                onClickAddAnd={handleAddAndFilter}
                onClickAddOr={handleAddOrFilter}
                onClickDelete={handleDeleteFilter}
              />
            )}

            {page === 2 && file !== null && (
              <Page2 filters={filters} file={file} />
            )}
          </ModalBody>

          <ModalFooter>
            {page === 1 && (
              <>
                <Button mr={3} onClick={handleClose}>
                  キャンセル
                </Button>

                <Button
                  colorScheme="blue"
                  isDisabled={file === null}
                  onClick={() => {
                    setPage(2)
                  }}
                >
                  次へ
                </Button>
              </>
            )}

            {page === 2 && (
              <>
                <Button
                  mr={3}
                  onClick={() => {
                    setPage(1)
                  }}
                >
                  前へ
                </Button>

                <Button
                  colorScheme="blue"
                  onClick={() => {
                    console.log('----------------------')
                    console.log('登録')
                  }}
                >
                  登録
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
