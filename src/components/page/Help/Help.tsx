'use client'

import {
  Container,
  Center,
  Heading,
  VStack,
  Text,
  Link,
  Button,
  Stack,
} from '@chakra-ui/react'
import NextLink from 'next/link'

import { path } from '@/constants'

export const Help = () => {
  return (
    <Container maxWidth={1200} paddingBottom={8} centerContent>
      <Center h={300}>
        <Heading as="h1" textAlign="center">
          Money forward の家計簿データ CSV を使って
          <br />
          月ごとの支出を基礎生活費とゆとり費にわける君
        </Heading>
      </Center>

      <VStack spacing="40">
        <Button as={NextLink} href={path.root} colorScheme="blue" size="lg">
          使ってみる
        </Button>

        <Stack spacing="4" maxWidth={700}>
          <Heading size="lg">これは何</Heading>
          <Text fontSize="xl">
            Money Forward
            って便利ですよね。クレカや銀行口座を登録すればあとは自動で収支を記録してくれるし費目を登録すれば自分がどの項目に対してどれだけのお金を使っているのかを簡単に振り返ることができるし。
          </Text>
          <Text fontSize="xl">
            だけど家計の考え方にはこんなものもあります。
            <br />
            <Link
              href="https://kobito-kabu.com/jiyuuheno-kakeibo-6level/"
              color="blue.500"
              isExternal
            >
              【自由への家計簿】経済的自由度を測る6つのレベルと家計管理戦略
            </Link>
          </Text>
          <Text fontSize="xl">
            ここでは、支出を「基礎生活費」と「ゆとり費」に分けることで個人に最適化された家計簿を作ることを推奨しています。
            <br />
            ただ、世の中にはそれを行うことができるサービスがないため、スプレッドシートなりを駆使して自分で手作業で分類していかなければなりません。
          </Text>
          <Text fontSize="xl">
            このウェブアプリケーションでは、Money Forward
            の月ごとの支出を出力した CSV
            を登録することで、簡単に支出を「基礎生活費」と「ゆとり費」に分けることができます。
            <br />
            Money Foraward
            の家計管理に加えてこのウェブアプリケーションを使うことで、個人の資産目標を達成するための手助けになるものです。
          </Text>

          <Heading size="lg">使い方</Heading>
          <Text fontSize="xl">TBD</Text>

          <Heading size="lg">問い合わせ</Heading>
          <Text fontSize="xl">
            Twitter にて
            <Link
              href="https://twitter.com/nabeliwo"
              color="blue.500"
              isExternal
            >
              @nabeliwo
            </Link>
            にご連絡ください。
          </Text>
        </Stack>
      </VStack>
    </Container>
  )
}
