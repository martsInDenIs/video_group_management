import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1742552863390 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE "public"."user_role_enum" AS ENUM ('viewer', 'editor')
    `);

    await queryRunner.query(`
        CREATE TABLE "users" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "email" character varying NOT NULL,
            "password" character varying NOT NULL,
            "role" "public"."user_role_enum" NOT NULL DEFAULT 'viewer',
            CONSTRAINT "PK_users" PRIMARY KEY ("id"),
            CONSTRAINT "UQ_users_email" UNIQUE ("email")
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Видаляємо таблицю
    await queryRunner.query(`
        DROP TABLE "users"
    `);

    // Видаляємо enum
    await queryRunner.query(`
        DROP TYPE "public"."user_role_enum"
    `);
  }
}
