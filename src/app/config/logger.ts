import pino from 'pino'

export default pino({
  prettyPrint: { colorize: true },
  timestamp: true,
  enabled: true,
  level: 'info'
})
