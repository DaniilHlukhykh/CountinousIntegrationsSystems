import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddPostsAuthorIndex1794254183066 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE INDEX "IDX_posts_authorId" ON "posts" ("authorId")',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "IDX_posts_authorId"');
  }
}
