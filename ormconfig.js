module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ...(process.env.NODE_ENV === 'prod' && { ssl: { rejectUnauthorized: false } }),
  synchronize: false,
  logging: false,

  migrations: [
    __dirname + '/dist/infra/database/migrations/*.js',
    __dirname + '/src/infra/database/migrations/*.ts'
  ],
  entities: ['./src/infra/database/models/account.ts', './dist/infra/database/models/account.js'],
  cli: {
    migrationsDir: './src/infra/database/migrations/',
    entitiesDir: './src/infra/database/models/'
  }
}
