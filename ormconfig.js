module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ...(process.env.NODE_ENV === 'production' && { ssl: { rejectUnauthorized: false } }),
  synchronize: false,
  logging: false,

  migrations: [
    __dirname +
      `/${
        process.env.NODE_ENV === 'production' ? 'dist' : 'src'
      }/infra/database/migrations/*.{js,ts}`
  ],
  entities: [
    // './dist/infra/database/models/account.js',
    `${process.env.NODE_ENV === 'production' ? 'dist' : 'src'}/infra/database/models/*.{js,ts}`
  ],
  cli: {
    migrationsDir: './src/infra/database/migrations/',
    entitiesDir: './src/infra/database/models/'
  }
}
