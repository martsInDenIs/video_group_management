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
import { CreateVideoDto, UpdateVideoDto } from './dto';
import { Roles } from 'src/auth/decorators';
import { Role } from 'src/users/role.enum';
import { FindVideosQueryDto } from './dto/find-videos.query.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Roles(Role.Editor)
  @Post('create')
  create(@Body() body: CreateVideoDto) {
    return this.videosService.create(body);
  }

  @Roles(Role.Viewer, Role.Editor)
  @Get()
  findAll(@Query() query: FindVideosQueryDto) {
    return this.videosService.findAll(query);
  }

  @Roles(Role.Viewer, Role.Editor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @Roles(Role.Editor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @Roles(Role.Editor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}
