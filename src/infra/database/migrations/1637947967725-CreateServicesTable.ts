import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateServicesTable1637947967725 implements MigrationInterface {
  name = 'CreateServicesTable1637947967725'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'services',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'description', type: 'text', isNullable: true },
          { name: 'maintainer_account_id', type: 'uuid', isNullable: false },
          { name: 'is_active', type: 'boolean', default: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' }
        ]
      }),
      true
    )
    await queryRunner.createForeignKey(
      'services',
      new TableForeignKey({
        name: 'fk_service_maintainer',
        referencedTableName: 'accounts',
        referencedColumnNames: ['id'],
        columnNames: ['maintainer_account_id'],
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('services', 'fk_service_maintainer')
    await queryRunner.dropTable('services', true)
  }
}
