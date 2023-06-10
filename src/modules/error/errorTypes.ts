type ErrorType = 'unauthorized' | 'notFound' | 'badRequest' | 'unexpected'

class AppError extends Error {
  readonly type: ErrorType

  constructor(type: ErrorType, message?: string) {
    super(message)
    this.type = type
  }
}

export class AppHttpError extends AppError {
  readonly response: Response

  constructor(response: Response, message?: string) {
    const type = AppHttpError.getType(response)

    super(type, message)

    this.name = 'AppHTTPError'
    this.response = response
  }

  private static getType(response: Response): ErrorType {
    const { status } = response

    if (status === 401) {
      return 'unauthorized'
    } else if (status === 404) {
      return 'notFound'
    } else if (String(status).match(/^4\d\d$/)) {
      return 'badRequest'
    }

    return 'unexpected'
  }
}
