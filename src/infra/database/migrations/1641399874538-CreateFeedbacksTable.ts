import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateFeedbacksTable1641399874538 implements MigrationInterface {
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
        name: 'fk_feedback_service',
        referencedTableName: 'services',
        referencedColumnNames: ['id'],
        columnNames: ['service_id'],
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    )
    await queryRunner.createForeignKey(
      'feedbacks',
      new TableForeignKey({
        name: 'fk_feedback_author',
        referencedTableName: 'authors',
        referencedColumnNames: ['email'],
        columnNames: ['author_email'],
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('feedback', 'fk_feedback_service')
    await queryRunner.dropForeignKey('feedback', 'fk_feedback_author')
    await queryRunner.dropTable('feedback', true)
  }
}
