import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm'

export class updateServiceApiKey1621511314641 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      'service',
      new TableUnique({ name: 'unique_api_key', columnNames: ['apiKey'] })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint(
      'service',
      new TableUnique({ name: 'unique_api_key', columnNames: ['apiKey'] })
    )
  }
}
