import { MigrationInterface, QueryRunner } from 'typeorm';

export class CommandRunAddSuccessColumn1625810608814 implements MigrationInterface {
  name = 'CommandRunAddSuccessColumn1625810608814';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `command_run` ADD `success` tinyint NULL AFTER status');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `command_run` DROP COLUMN `success`');
  }
}
