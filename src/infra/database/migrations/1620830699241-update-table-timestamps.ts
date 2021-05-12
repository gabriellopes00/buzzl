import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class updateTableTimestamps1620830699241 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({ name: 'updated_at', type: 'timestamp', default: 'now()' })
    )
    await queryRunner.addColumn(
      'service',
      new TableColumn({ name: 'updated_at', type: 'timestamp', default: 'now()' })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'updated_at')
    await queryRunner.dropColumn('service', 'updated_at')
  }
}
