module.exports = {
  migrations: [process.env.MIGRATIONS_DIR],
  entities: [process.env.ENTITIES_DIR],
  cli: {
    migrationsDir: './src/infra/database/migrations/',
    entitiesDir: './src/infra/database/entities/'
  }
}
