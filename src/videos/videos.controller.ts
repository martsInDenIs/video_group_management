import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto, UpdateVideoDto } from './dto';
import { Roles } from 'src/auth/decorators';
import { Role } from 'src/users/role.enum';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Roles(Role.Editor)
  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Roles(Role.Viewer, Role.Editor)
  @Get()
  findAll() {
    return this.videosService.findAll();
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
