import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateGoogleAccountTable1641834653459 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'google_accounts',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'email', type: 'varchar', isNullable: false, isUnique: true },
          { name: 'google_id', type: 'varchar', isNullable: false, isUnique: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' }
        ]
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('google_accounts', true)
  }
}
