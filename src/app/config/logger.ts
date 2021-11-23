import pino from 'pino'

export default pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  },
  timestamp: true,
  enabled: true,
  level: 'info'
})
