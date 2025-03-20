import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto, UpdateVideoDto, FindVideosQueryDto } from './dto';
import { Roles } from '@/auth/decorators';
import { Role } from '@/users/role.enum';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Video } from './entities/video.entity';

@ApiTags('videos')
@ApiBearerAuth()
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @ApiOperation({ summary: 'Create a new video' })
  @ApiResponse({
    status: 201,
    description: 'Video has been successfully created.',
    type: Video,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Editor role required.',
  })
  @Roles(Role.Editor)
  @Post('create')
  create(@Body() body: CreateVideoDto) {
    return this.videosService.create(body);
  }

  @ApiOperation({ summary: 'Get all videos' })
  @ApiResponse({
    status: 200,
    description: 'Returns all videos with pagination.',
    schema: {
      properties: {
        videos: {
          type: 'array',
          items: { $ref: '#/components/schemas/Video' },
        },
        total: {
          type: 'number',
          example: 100,
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Viewer or Editor role required.',
  })
  @Roles(Role.Viewer, Role.Editor)
  @Get()
  findAll(@Query() query: FindVideosQueryDto) {
    return this.videosService.findAll(query);
  }

  @ApiOperation({ summary: 'Get video by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a video by ID.',
    type: Video,
  })
  @ApiResponse({ status: 404, description: 'Video not found.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Viewer or Editor role required.',
  })
  @Roles(Role.Viewer, Role.Editor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @ApiOperation({ summary: 'Update video' })
  @ApiResponse({
    status: 200,
    description: 'Video has been successfully updated.',
    type: Video,
  })
  @ApiResponse({ status: 404, description: 'Video not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Editor role required.',
  })
  @Roles(Role.Editor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @ApiOperation({ summary: 'Delete video' })
  @ApiResponse({
    status: 200,
    description: 'Video has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Video not found.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Editor role required.',
  })
  @Roles(Role.Editor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}
