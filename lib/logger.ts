type LogLevel = "info" | "warn" | "error" | "debug"

interface LoggerConfig {
  enableInProduction: boolean
  prefix: string
}

const isDevelopment = process.env.NODE_ENV === "development"

class Logger {
  private config: LoggerConfig = {
    enableInProduction: false,
    prefix: "[RustBaseLab]",
  }

  private shouldLog(level: LogLevel): boolean {
    if (isDevelopment) return true
    if (level === "error") return true // Always log errors
    return this.config.enableInProduction
  }

  info(message: string, ...args: any[]) {
    if (this.shouldLog("info")) {
      console.log(`${this.config.prefix} ${message}`, ...args)
    }
  }

  warn(message: string, ...args: any[]) {
    if (this.shouldLog("warn")) {
      console.warn(`${this.config.prefix} ${message}`, ...args)
    }
  }

  error(message: string, error?: any) {
    if (this.shouldLog("error")) {
      console.error(`${this.config.prefix} ${message}`, error)
    }
  }

  debug(message: string, ...args: any[]) {
    if (this.shouldLog("debug")) {
      console.log(`${this.config.prefix} [DEBUG] ${message}`, ...args)
    }
  }
}

export const logger = new Logger()
