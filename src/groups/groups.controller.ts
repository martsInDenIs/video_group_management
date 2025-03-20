import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Role } from 'src/users/role.enum';
import { Roles } from 'src/auth/decorators';
import { FindGroupQueryDto } from './dto/find-group-query.dto';
import { RolesGuard } from 'src/auth/guards';
import { GetGroupTreeDTO } from './dto/get-group-tree.dto';

@UseGuards(RolesGuard)
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Roles(Role.Editor)
  @Post('create')
  create(@Body() body: CreateGroupDto) {
    return this.groupsService.create(body);
  }

  @Roles(Role.Viewer, Role.Editor)
  @Get()
  findAll(@Query() query: FindGroupQueryDto) {
    return this.groupsService.findAll(query);
  }

  @Roles(Role.Editor, Role.Viewer)
  @Get('tree')
  getTree(@Query() query: GetGroupTreeDTO) {
    return this.groupsService.getTree(query);
  }

  @Roles(Role.Viewer, Role.Editor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @Roles(Role.Editor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Roles(Role.Editor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }
}
