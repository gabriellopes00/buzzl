import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateFeedbackAuthorTable1641397096138 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'authors',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar', isNullable: true },
          { name: 'email', type: 'varchar', isUnique: true, isNullable: false },
          { name: 'created_at', type: 'timestamp', default: 'now()' }
        ]
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('authors', true)
  }
}
