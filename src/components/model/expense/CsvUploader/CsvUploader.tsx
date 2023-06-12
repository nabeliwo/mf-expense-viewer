'use client'

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { FC, useCallback, useState } from 'react'

import { Classification, ExpenseRowObject, Filters } from '@/modules/expense'

import { ModalCheckPage } from './ModalCheckPage'
import { ModalUploadPage } from './ModalUploadPage'

type Props = {
  filters: Filters
  onChangeFilters: (filters: Filters) => void
  onRegister: (
    checkList: Array<Classification | undefined>,
    rows: ExpenseRowObject[],
  ) => void
  onCloseModal: () => void
}

export const CsvUploader: FC<Props> = ({
  filters,
  onChangeFilters,
  onRegister,
  onCloseModal,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [page, setPage] = useState<1 | 2>(1)
  const [file, setFile] = useState<File | null>(null)

  const handleClose = useCallback(() => {
    onClose()
    setFile(null)
    setPage(1)
    onCloseModal()
  }, [onClose, onCloseModal])

  const handleClickRegister = useCallback(
    (
      checkList: Array<Classification | undefined>,
      rows: ExpenseRowObject[],
    ) => {
      onRegister(checkList, rows)
      handleClose()
    },
    [onRegister, handleClose],
  )

  return (
    <>
      <Button colorScheme="blue" size="lg" onClick={onOpen}>
        MF CSV をアップロードしてデータを登録する
      </Button>

      <Modal
        isOpen={isOpen}
        size="6xl"
        closeOnOverlayClick={false}
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>CSV からデータを登録する ({page}/2)</ModalHeader>
          <ModalCloseButton />

          {page === 1 && (
            <ModalUploadPage
              file={file}
              filters={filters}
              onSetFile={(file: File) => setFile(file)}
              onChangeFilters={onChangeFilters}
              onClickCancel={() => handleClose()}
              onClickNext={() => setPage(2)}
            />
          )}

          {page === 2 && file !== null && (
            <ModalCheckPage
              filters={filters}
              file={file}
              onClickPrev={() => setPage(1)}
              onClickRegister={handleClickRegister}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
