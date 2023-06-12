import dayjs from 'dayjs'
import { headers, cookies } from 'next/headers'

import { ApplicationLayout } from '@/components/layout/ApplicationLayout'
import { Home } from '@/components/page/Home'
import { ExpenseResult, fetchExpense } from '@/modules/expense'
import { User } from '@/modules/user'

import {} from 'react'

const HomePage = async ({
  searchParams,
}: {
  searchParams: Record<string, string>
}) => {
  const csrfToken = headers().get('X-CSRF-Token') || ''
  const userCookie = cookies().get('user')?.value
  const user: User | null = userCookie ? JSON.parse(userCookie) : null
  let expense: ExpenseResult | null = null

  if (user) {
    const today = dayjs(searchParams.month ?? undefined)
    expense = (await fetchExpense(user.id, today.format('YYYY-MM'))) ?? null
  }

  return (
    <ApplicationLayout user={user} csrfToken={csrfToken}>
      <Home user={user} csrfToken={csrfToken} defaultExpense={expense} />
    </ApplicationLayout>
  )
}

export default HomePage
