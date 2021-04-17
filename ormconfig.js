module.exports = {
  type: 'postgres',
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // username: process.env.DB_USER_NAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  url: process.env.DB_URL,
  synchronize: false,
  logging: false,

  migrations: [__dirname + `/${process.env.MIGRATIONS}/infra/database/migrations/*{.ts,.js}`],
  entities: [__dirname + `/${process.env.ENTITIES}/infra/database/models/*{.ts,.js}`],
  cli: {
    migrationsDir: './src/infra/database/migrations/',
    entitiesDir: './src/infra/database/models/'
  }
}
