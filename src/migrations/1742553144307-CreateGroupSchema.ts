import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGroupSchema1742553144307 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "groups" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" character varying NOT NULL,
            "description" character varying,
            "parentId" uuid,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_groups" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        ALTER TABLE "groups" 
        ADD CONSTRAINT "FK_groups_parent" 
        FOREIGN KEY ("parentId") 
        REFERENCES "groups"("id") 
        ON DELETE CASCADE
        ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "groups" 
        DROP CONSTRAINT "FK_groups_parent"
    `);

    // Видаляємо таблицю
    await queryRunner.query(`
        DROP TABLE "groups"
    `);
  }
}
