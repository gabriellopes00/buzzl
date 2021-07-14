import * as Sentry from '@sentry/node'

Sentry.init({ tracesSampleRate: 1.0 })

export { Sentry }
