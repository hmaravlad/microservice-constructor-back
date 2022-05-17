import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { CookieAuthenticationGuard } from 'src/auth/cookie-auth.guard';
import { RequestWithUser } from 'src/auth/types/resquest-with-user';
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
}
