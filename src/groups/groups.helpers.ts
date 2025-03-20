import { Group } from './entities/group.entity';

export const getTreeRawQuery = (rootGroup?: Group['id']) => `
    WITH
    root_count AS (
      SELECT COUNT(*) as total
      FROM groups g
      WHERE ${rootGroup ? 'g.id = $1' : 'g."parentId" IS NULL'}
    ),
    root_groups AS (
      SELECT 
        g.*
      FROM groups g
      WHERE ${rootGroup ? 'g.id = $1' : 'g."parentId" IS NULL'}
      ORDER BY g.name
      LIMIT $${rootGroup ? '2' : '1'}
      OFFSET $${rootGroup ? '3' : '2'}
    )
    SELECT
      (SELECT total FROM root_count) as total,
      COALESCE(
        jsonb_agg(
          jsonb_build_object(
            'id', g.id,
            'name', g.name,
            'description', g.description,
            'parentId', g."parentId",
            'children', get_group_children(g.id)
          )
          ORDER BY g.name
        ),
        '[]'::jsonb
      ) as tree
  FROM root_groups g;
  `;
