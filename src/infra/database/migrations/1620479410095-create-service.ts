import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createService1620479410095 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'service',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'description', type: 'text', isNullable: true },
          { name: 'maintainer', type: 'uuid', isNullable: false },
          { name: 'isActive', type: 'boolean', default: true },
          { name: 'apiKey', type: 'varchar', isPrimary: true, length: '30' },
          { name: 'created_at', type: 'timestamp', default: 'now()' }
        ]
      }),
      true
    )
    await queryRunner.createForeignKey(
      'service',
      new TableForeignKey({
        name: 'fkMaintainer',
        referencedTableName: 'accounts',
        referencedColumnNames: ['id'],
        columnNames: ['maintainer'],
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('service', 'fkMaintainer')
    await queryRunner.dropTable('service', true)
  }
}
