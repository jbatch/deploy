import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameAppUsernameToName1625710668992 implements MigrationInterface {
  name = 'RenameAppUsernameToName1625710668992';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX `IDX_95187d236356414c9759beb7ee` ON `app`');
    await queryRunner.query('ALTER TABLE `app` CHANGE `user_name` `name` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `app` ADD UNIQUE INDEX `IDX_f36adbb7b096ceeb6f3e80ad14` (`name`)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `app` DROP INDEX `IDX_f36adbb7b096ceeb6f3e80ad14`');
    await queryRunner.query('ALTER TABLE `app` CHANGE `name` `user_name` varchar(255) NOT NULL');
    await queryRunner.query('CREATE UNIQUE INDEX `IDX_95187d236356414c9759beb7ee` ON `app` (`user_name`)');
  }
}
