module.exports = {
  type: 'postgres',
  url: process.env.DB_URL,
  synchronize: false,
  logging: false,

  migrations: [
    __dirname +
      `/${process.env.NODE_ENV === 'dev' ? 'src' : 'dist'}/infra/database/migrations/*{.ts,.js}`
  ],
  entities: [
    __dirname +
      `/${process.env.NODE_ENV === 'dev' ? 'src' : 'dist'}/infra/database/models/*{.ts,.js}`
  ],
  cli: {
    migrationsDir: './src/infra/database/migrations/',
    entitiesDir: './src/infra/database/models/'
  }
}
