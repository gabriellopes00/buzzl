import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { tableNames } from '../helpers/psql-helper'

export class createUser1618570867548 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableNames.user,
        columns: [
          { name: 'id', type: 'varchar', isNullable: false, isUnique: true, isPrimary: true },
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
    await queryRunner.dropTable(tableNames.user, true)
  }
}
