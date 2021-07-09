import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAppTable1625709946775 implements MigrationInterface {
  name = 'CreateAppTable1625709946775';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `app` (`id` varchar(255) NOT NULL, `user_name` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_9478629fc093d229df09e560ae` (`id`), UNIQUE INDEX `IDX_95187d236356414c9759beb7ee` (`user_name`), PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX `IDX_95187d236356414c9759beb7ee` ON `app`');
    await queryRunner.query('DROP INDEX `IDX_9478629fc093d229df09e560ae` ON `app`');
    await queryRunner.query('DROP TABLE `app`');
  }
}
