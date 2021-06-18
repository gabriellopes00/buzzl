import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createEvaluation1624038221768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'evaluation',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'rating', type: 'int', isNullable: false },
          { name: 'service', type: 'varchar', isNullable: false, length: '30' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' }
        ]
      }),
      true
    )
    await queryRunner.createForeignKey(
      'evaluation',
      new TableForeignKey({
        name: 'fkService',
        referencedTableName: 'service',
        referencedColumnNames: ['apiKey'],
        columnNames: ['service'],
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('evaluation', 'fkService')
    await queryRunner.dropTable('evaluation', true)
  }
}
