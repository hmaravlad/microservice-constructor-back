import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CookieAuthenticationGuard } from 'src/auth/cookie-auth.guard';
import { RequestWithUser } from 'src/auth/types/resquest-with-user';
import { CreateProjectDto } from './dto/create-project.dto';
import { ReturnProjectDto } from './dto/return-project.dto';
import { SaveProjectDto } from './dto/save-project.dto';
import { Project } from './entities/project.entity';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(CookieAuthenticationGuard)
  @Get('')
  async getAllProjects(@Req() request: RequestWithUser): Promise<Project[]> {
    const { user } = request;
    return this.projectService.getAllProjects(user);
  }

  @UseGuards(CookieAuthenticationGuard)
  @Get(':id')
  async getProject(
    @Req() request: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnProjectDto> {
    const { user } = request;
    return this.projectService.getProject(user, id);
  }

  @UseGuards(CookieAuthenticationGuard)
  @Post('')
  async newProject(
    @Req() request: RequestWithUser,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<number> {
    const { user } = request;
    return this.projectService.newProject(user, createProjectDto);
  }

  @UseGuards(CookieAuthenticationGuard)
  @Post(':id/save')
  async Save(
    @Req() request: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() saveProjectDto: SaveProjectDto,
  ) {
    const { user } = request;
    await this.projectService.saveProject(
      user,
      id,
      saveProjectDto.project,
      saveProjectDto.entities,
    );
  }

  @UseGuards(CookieAuthenticationGuard)
  @Delete(':id')
  async RemoveProject(
    @Req() request: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const { user } = request;
    this.projectService.removeProject(user, id);
  }
}
