import chalk from 'chalk'

export type LoggerDetails = Record<string, unknown>
export type LogLevel = 'info' | 'error' | 'debug' | 'fatal' | 'warn'

const SEPARATOR = '::'

export class Logger {
  details: LoggerDetails
  context: string | null
  constructor(details: LoggerDetails, context?: string) {
    this.details = details
    this.context = context ?? null
  }

  info(msg?: string) {
    const now = new Date().toISOString()
    console.log(
      /* LOG_LEVEL */ chalk.bold.hex('#a2f4bf').bgHex('#232323')(
        '[INFO]',
      ),
      SEPARATOR,
      /* DATETIME */ chalk.bold.hex('#87d1f3').bgHex('#232323')(
        `[${now}]`,
      ),
      SEPARATOR,
      /* CONTEXT */ chalk.bold.black.bgHex('#9bd9fd')(
        `{${this.context}}`,
      ),
      SEPARATOR,
      /* MSG + DETAILS */ chalk.hex('#87d1f3')(msg),
      this.details,
    )
  }

  debug(msg?: string) {
    const now = new Date().toISOString()
    console.log(
      /* LOG_LEVEL */ chalk.bold.hex('#a2f4bf').bgHex('#232323')(
        '[DEBUG]',
      ),
      SEPARATOR,
      /* DATETIME */ chalk.bold.hex('#a2f4bf').bgHex('#232323')(
        `[${now}]`,
      ),
      SEPARATOR,
      /* CONTEXT */ chalk.bold.black.bgHex('#92edb2')(
        `{${this.context}}`,
      ),
      SEPARATOR,
      /* MSG + DETAILS */ chalk.hex('#67fe9d')(msg),
      this.details,
    )
  }
}
