function str(message?: string | never): string {
  if (typeof message === 'string') {
    return message
  } else if (`${message}` !== '[object Object]') {
    return `${message}`
  } else {
    try {
      return JSON.stringify(message)
    } catch (_e) {
      return `${message}`
    }
  }
}

function caller(): string {
  const s = new Error().stack
  return s ? s.split('\n')[3] : 'unknown'
}

export default {
  info: (message?: string | never): void =>
    console.info(`[I] ${str(message)} [ position: ${caller()} ]`),
  debug: (message?: string | never): void =>
    console.debug(`[D] ${str(message)} [ position: ${caller()} ]`),
  warn: (message?: string | never): void =>
    console.warn(`[W] ${str(message)} [ position: ${caller()} ]`),
  error: (message?: string | never, error?: Error): void =>
    console.error(
      error
        ? JSON.stringify({
            level: 'Error',
            message: str(message),
            error,
            position: caller(),
          })
        : `[E] ${str(message)} [ position: ${caller()} ]`
    ),
}
