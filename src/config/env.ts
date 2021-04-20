import 'dotenv/config'

export const {
  PORT,
  API_LOG_ERRORS,
  API_LOG_REQUESTS,
  DB_URL,
  MAX_FEEDBACK_REQUESTS,
  MAX_NPS_REQUESTS,
  TOKEN_SECRET_KEY,
  NODE_ENV
} = process.env
