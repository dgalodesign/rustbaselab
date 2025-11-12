import { logger } from "./logger"

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode = 500,
  ) {
    super(message)
    this.name = "AppError"
  }
}

export function handleDatabaseError(error: any, context: string): never {
  logger.error(`Database error in ${context}:`, {
    message: error?.message,
    details: error?.details,
    hint: error?.hint,
    code: error?.code,
  })

  throw new AppError(`Failed to ${context}`, error?.code, 500)
}

export function handleError(error: unknown, context: string): never {
  if (error instanceof AppError) {
    throw error
  }

  logger.error(`Unexpected error in ${context}:`, error)

  throw new AppError(`An unexpected error occurred in ${context}`, "UNKNOWN_ERROR", 500)
}
