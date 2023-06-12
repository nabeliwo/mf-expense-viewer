import { ref, get, set } from '@firebase/database'

import { database } from '@/libs/firebase'

import { ExpenseResult } from './expenseType'

export const fetchExpense = async (
  userId: string,
  month: string,
): Promise<ExpenseResult | undefined> => {
  const expenseRef = ref(database, `expense/${userId}/${month}`)
  const snapshot = await get(expenseRef)

  if (snapshot.exists()) {
    return snapshot.val()
  }

  return undefined
}

export const createExpense = async (
  userId: string,
  month: string,
  expenseResult: ExpenseResult,
) => {
  const expenseRef = ref(database, `expense/${userId}/${month}`)
  await set(expenseRef, expenseResult)
}
