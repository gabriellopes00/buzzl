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
  entities: [__dirname + `/${process.env.ENTITIES}/infra/database/models/*{.ts,.js}`],
  cli: {
    migrationsDir: './src/infra/database/migrations/',
    entitiesDir: './src/infra/database/models/'
  }
}
