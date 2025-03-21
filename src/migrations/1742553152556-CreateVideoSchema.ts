import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVideoSchema1742553152556 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "videos" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "description" character varying,
                "url" character varying NOT NULL,
                "groupId" uuid NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_videos" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "videos" 
            ADD CONSTRAINT "FK_videos_groups" 
            FOREIGN KEY ("groupId") 
            REFERENCES "groups"("id") 
            ON DELETE CASCADE
            ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "videos" 
        DROP CONSTRAINT "FK_videos_groups"
    `);
    await queryRunner.query(`
        DROP TABLE "videos"
    `);
  }
}
