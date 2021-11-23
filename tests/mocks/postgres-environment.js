require('dotenv/config')
const { exec } = require('child_process')
const NodeEnvironment = require('jest-environment-node')
const util = require('util')

const execSync = util.promisify(exec)

class PostgresTestEnv extends NodeEnvironment {
  constructor(config) {
    super(config)
  }

  async setup() {
    await execSync(`npm run typeorm migration:run`)
    return super.setup()
  }
}

module.exports = PostgresTestEnv
