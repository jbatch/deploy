import { MigrationInterface, QueryRunner } from 'typeorm';

export class AppMakeUrlAndRootDirNullable1625718393857 implements MigrationInterface {
  name = 'AppMakeUrlAndRootDirNullable1625718393857';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `app` CHANGE `url` `url` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `app` CHANGE `root_dir` `root_dir` varchar(255) NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `app` CHANGE `root_dir` `root_dir` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `app` CHANGE `url` `url` varchar(255) NOT NULL');
  }
}
