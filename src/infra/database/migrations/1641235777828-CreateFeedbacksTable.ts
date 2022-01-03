import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateFeedbacksTable1641235777828 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'feedbacks',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'title', type: 'varchar', isNullable: true },
          { name: 'content', type: 'text', isNullable: false },
          {
            name: 'category',
            type: 'varchar',
            isNullable: false,
            enum: ['COMMENT', 'ISSUE', 'IDEA', 'OTHER']
          },
          { name: 'service_id', type: 'uuid', isNullable: false },
          { name: 'author_name', type: 'varchar', isNullable: true },
          { name: 'author_email', type: 'varchar', isNullable: true },
          { name: 'is_private', type: 'boolean', isNullable: false },
          { name: 'created_at', type: 'timestamp', default: 'now()' }
        ]
      }),
      true
    )
    await queryRunner.createForeignKey(
      'feedbacks',
      new TableForeignKey({
        name: 'fk_service_feedback',
        referencedTableName: 'service',
        referencedColumnNames: ['id'],
        columnNames: ['service_id'],
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('feedback', 'fk_service_feedback')
    await queryRunner.dropTable('feedback', true)
  }
}
