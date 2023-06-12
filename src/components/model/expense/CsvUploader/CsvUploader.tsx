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
import { FC, useCallback, useState } from 'react'

import { Filters } from '@/modules/expense'

import { Page1 } from './Page1'
import { Page2 } from './Page2'

type Props = {
  filters: Filters
  onChangeFilters: (filters: Filters) => void
  onRegister: () => void
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
          <ModalBody>
            {page === 1 && (
              <Page1
                fileName={file?.name ?? ''}
                filters={filters}
                onSetFile={(file: File) => setFile(file)}
                onChangeFilters={onChangeFilters}
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
                    onRegister()
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
