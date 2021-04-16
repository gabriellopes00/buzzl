require('dotenv/config')
require('module-alias/register')

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,

  migrations: [process.env.MIGRATIONS_DIR],
  entities: [process.env.ENTITIES_DIR],
  cli: {
    migrationsDir: './src/infra/database/migrations/',
    entitiesDir: './src/infra/database/entities/'
  }
}
