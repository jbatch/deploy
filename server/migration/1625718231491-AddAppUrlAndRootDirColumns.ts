import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAppUrlAndRootDirColumns1625718231491 implements MigrationInterface {
  name = 'AddAppUrlAndRootDirColumns1625718231491';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `app` ADD `url` varchar(255) NOT NULL AFTER name');
    await queryRunner.query('ALTER TABLE `app` ADD `root_dir` varchar(255) NOT NULL AFTER url');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `app` DROP COLUMN `root_dir`');
    await queryRunner.query('ALTER TABLE `app` DROP COLUMN `url`');
  }
}
