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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Role } from 'src/users/role.enum';
import { Roles } from 'src/auth/decorators';
import { FindGroupQueryDto } from './dto/find-group-query.dto';
import { RolesGuard } from 'src/auth/guards';
import { GetGroupTreeDTO } from './dto/get-group-tree.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Group } from './entities/group.entity';

@ApiTags('groups')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiOperation({ summary: 'Create a new group' })
  @ApiResponse({
    status: 201,
    description: 'The group has been successfully created.',
    type: Group,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Editor)
  @Post('create')
  create(@Body() body: CreateGroupDto) {
    return this.groupsService.create(body);
  }

  @ApiOperation({ summary: 'Get all groups' })
  @ApiResponse({
    status: 200,
    description: 'Return all groups.',
    type: [Group],
  })
  @Roles(Role.Viewer, Role.Editor)
  @Get()
  findAll(@Query() query: FindGroupQueryDto) {
    return this.groupsService.findAll(query);
  }

  @ApiOperation({ summary: 'Get group tree' })
  @ApiResponse({
    status: 200,
    description: 'Return group tree.',
    type: Group,
  })
  @Roles(Role.Editor, Role.Viewer)
  @Get('tree')
  getTree(@Query() query: GetGroupTreeDTO) {
    return this.groupsService.getTree(query);
  }

  @ApiOperation({ summary: 'Get a group by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the group.',
    type: Group,
  })
  @ApiResponse({ status: 404, description: 'Group not found.' })
  @Roles(Role.Viewer, Role.Editor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a group' })
  @ApiResponse({
    status: 200,
    description: 'The group has been successfully updated.',
    type: Group,
  })
  @ApiResponse({ status: 404, description: 'Group not found.' })
  @Roles(Role.Editor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @ApiOperation({ summary: 'Delete a group' })
  @ApiResponse({
    status: 204,
    description: 'The group has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Group not found.' })
  @Roles(Role.Editor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }
}
