module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,

  migrations: [__dirname + '/dist/infra/database/migrations/*{.ts,.js}'],
  entities: [__dirname + '/dist/infra/database/models/*{.ts,.js}'],
  cli: {
    migrationsDir: './src/infra/database/migrations/',
    entitiesDir: './src/infra/database/models/'
  }
}
