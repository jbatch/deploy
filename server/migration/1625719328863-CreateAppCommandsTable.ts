import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAppCommandsTable1625719328863 implements MigrationInterface {
  name = 'CreateAppCommandsTable1625719328863';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `app_command` (`id` varchar(255) NOT NULL, `app` varchar(255) NULL, `name` varchar(255) NOT NULL, `command` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_81bb154e6fdf5c25d4a5735c31` (`id`), PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      'ALTER TABLE `app_command` ADD CONSTRAINT `FK_33cc54e40b516b959d7eb3a28cf` FOREIGN KEY (`app`) REFERENCES `app`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `app_command` DROP FOREIGN KEY `FK_33cc54e40b516b959d7eb3a28cf`');
    await queryRunner.query('DROP INDEX `IDX_81bb154e6fdf5c25d4a5735c31` ON `app_command`');
    await queryRunner.query('DROP TABLE `app_command`');
  }
}
