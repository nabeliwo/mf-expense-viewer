import { AppHttpError } from '@/modules/error'

const baseOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const handleResponse = (res: Response) => {
  if (!res.ok) {
    throw new AppHttpError(
      res,
      `"${new URL(res.url).pathname}" ${res.status} ${res.statusText}`,
    )
  }

  return res.json().catch(() => {
    // parse に失敗したら空のオブジェクトを返す
    return {}
  })
}

export const httpRequest = {
  post: <T>(url: string, data?: Record<string, unknown>): Promise<T> => {
    const body = data ? JSON.stringify(data) : undefined

    return fetch(url, {
      method: 'POST',
      body,
      ...baseOptions,
    }).then(handleResponse)
  },

  delete: <T>(url: string): Promise<T> => {
    return fetch(url, {
      method: 'DELETE',
      ...baseOptions,
    }).then(handleResponse)
  },
}
