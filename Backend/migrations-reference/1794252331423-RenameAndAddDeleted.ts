import type { MigrationInterface, QueryRunner } from "typeorm";

export class RenameAndAddDeleted1794252331423 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE user_entity RENAME TO users");
    await queryRunner.query("ALTER TABLE newspost_entity RENAME TO posts");
    await queryRunner.query(
      "ALTER TABLE users ADD COLUMN deleted boolean NOT NULL DEFAULT false;",
    );
    await queryRunner.query(
      "ALTER TABLE posts ADD COLUMN deleted boolean NOT NULL DEFAULT false;",
    );
    await queryRunner.query("ALTER TABLE posts RENAME COLUMN title TO header");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE posts RENAME COLUMN header TO title");
    await queryRunner.query("ALTER TABLE posts DROP COLUMN deleted;");
    await queryRunner.query("ALTER TABLE users DROP COLUMN deleted;");
    await queryRunner.query("ALTER TABLE posts RENAME TO newspost_entity");
    await queryRunner.query("ALTER TABLE users RENAME TO user_entity");
  }
}
