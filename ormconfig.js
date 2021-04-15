const {
  dbHost,
  dbType,
  dbName,
  dbPort,
  dbUserName,
  dbPassword,
  nodeEnv,
  dbConnection
} = require('./src/config/env')

module.exports = {
  name: dbConnection,
  type: dbType,
  host: dbHost,
  port: dbPort,
  username: dbUserName,
  password: dbPassword,
  database: nodeEnv != 'development' ? dbName : 'test',
  synchronize: false,
  logging: false,
  migrations: ['src/infra/database/migrations/*.ts'],
  entities: ['src/infra/database/models/*.ts'],
  cli: {
    migrationsDir: 'src/infra/database/migrations'
  }
}
