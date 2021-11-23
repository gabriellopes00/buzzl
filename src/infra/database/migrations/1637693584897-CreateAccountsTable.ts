import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateAccountsTable1637693584897 implements MigrationInterface {
  name = 'CreateAccountsTable1637693584897'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'accounts',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'email', type: 'varchar', isNullable: false, isUnique: true },
          { name: 'password', type: 'varchar', isNullable: false },
          { name: 'created_at', type: 'timestamp', default: 'now()' }
        ]
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('accounts', true)
  }
}
