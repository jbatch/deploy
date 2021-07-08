import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1625704112487 implements MigrationInterface {
  name = 'CreateUserTable1625704112487';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `user` (`id` varchar(255) NOT NULL, `user_name` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_cace4a159ff9f2512dd4237376` (`id`), UNIQUE INDEX `IDX_d34106f8ec1ebaf66f4f8609dd` (`user_name`), PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX `IDX_d34106f8ec1ebaf66f4f8609dd` ON `user`');
    await queryRunner.query('DROP INDEX `IDX_cace4a159ff9f2512dd4237376` ON `user`');
    await queryRunner.query('DROP TABLE `user`');
  }
}
