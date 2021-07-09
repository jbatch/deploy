import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCommandRunTable1625809644281 implements MigrationInterface {
  name = 'CreateCommandRunTable1625809644281';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `command_run` (`id` varchar(255) NOT NULL, `command` varchar(255) NULL, `status` varchar(255) NOT NULL, `output` text NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_357a711704c987606db04d3e78` (`id`), PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      'ALTER TABLE `command_run` ADD CONSTRAINT `FK_8d20297ee5a191659404c66a60c` FOREIGN KEY (`command`) REFERENCES `app_command`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `command_run` DROP FOREIGN KEY `FK_8d20297ee5a191659404c66a60c`');
    await queryRunner.query('DROP INDEX `IDX_357a711704c987606db04d3e78` ON `command_run`');
    await queryRunner.query('DROP TABLE `command_run`');
  }
}
