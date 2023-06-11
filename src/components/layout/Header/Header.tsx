'use client'

import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Link,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useRef } from 'react'

import { LoginButton } from '@/components/model/user/LoginButton'
import { path } from '@/constants'
import { User, logout } from '@/modules/user'

type Props = {
  user: User | null
  csrfToken: string
}

export const Header: FC<Props> = ({ user, csrfToken }) => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)

  const handleClickLogout = useCallback(async () => {
    await logout()
    router.refresh()
  }, [router])

  return (
    <header>
      <Flex alignItems="center" justifyContent="space-between" p={4}>
        <Link as={NextLink} href={path.root} fontWeight="bold">
          Money forward の家計簿データ CSV
          を使って月ごとの支出を基礎生活費とゆとり費にわける君
        </Link>

        <Flex alignItems="center" gap={4}>
          <Link as={NextLink} href={path.help} fontWeight="bold">
            使い方
          </Link>

          {user ? (
            <>
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  rightIcon={<ChevronDownIcon />}
                >
                  {user?.name}
                </MenuButton>

                <MenuList>
                  <MenuItem onClick={() => handleClickLogout()}>
                    ログアウト
                  </MenuItem>
                  <MenuItem onClick={() => onOpen()}>退会</MenuItem>
                </MenuList>
              </Menu>

              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      退会してアカウントを削除します
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      退会した場合、そのアカウントで登録したデータを全て削除しますが、よろしいですか？
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        キャンセル
                      </Button>

                      <Button
                        colorScheme="red"
                        ml={3}
                        onClick={() => {
                          console.log('TODO')
                        }}
                      >
                        削除
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </>
          ) : (
            <LoginButton csrfToken={csrfToken} />
          )}
        </Flex>
      </Flex>
    </header>
  )
}
