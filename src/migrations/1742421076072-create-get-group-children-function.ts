import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGetGroupChildrenFunction1742421076072
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE OR REPLACE FUNCTION get_group_children(parent_id uuid)
          RETURNS jsonb AS $$
          WITH RECURSIVE children AS (
            SELECT 
              g.*
            FROM groups g
            WHERE g."parentId" = parent_id::uuid
      
            UNION ALL
      
            SELECT 
              g.*
            FROM groups g
            JOIN children c ON g."parentId" = c.id::uuid
          )
          SELECT COALESCE(
            jsonb_agg(
              jsonb_build_object(
                'id', c.id,
                'name', c.name,
                'description', c.description,
                'children', get_group_children(c.id)
              )
              ORDER BY c.name
            ),
            '[]'::jsonb
          )
          FROM children c
          WHERE c."parentId" = parent_id::uuid;
          $$ LANGUAGE SQL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DROP FUNCTION IF EXISTS get_group_children(uuid);
        `);
  }
}
