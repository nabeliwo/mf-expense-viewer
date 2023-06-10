'use client'

import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FC, useCallback } from 'react'

import { path } from '@/constants'
import { User, logout } from '@/modules/user'

type Props = {
  user: User
}

export const Header: FC<Props> = ({ user }) => {
  const router = useRouter()
  const handleClickLogout = useCallback(async () => {
    await logout()
    router.push(path.root)
  }, [router])

  return (
    <header>
      <Flex alignItems="center" justifyContent="space-between" p={4}>
        <Text fontWeight="bold">
          Money forward の家計簿データ CSV
          を使って月ごとの支出を基礎生活費とゆとり費にわける君
        </Text>

        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            rightIcon={<ChevronDownIcon />}
          >
            {user.name}
          </MenuButton>

          <MenuList>
            <MenuItem onClick={() => handleClickLogout()}>ログアウト</MenuItem>
            <MenuItem onClick={() => console.log('TODO')}>退会</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </header>
  )
}
