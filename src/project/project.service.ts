import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { ReturnProjectDto } from './dto/return-project.dto';
import { Entity } from './entities/entity.entity';
import { Project } from './entities/project.entity';
import { ProjectQueries } from './project.queries';

@Injectable()
export class ProjectService {
  constructor(private projectQueries: ProjectQueries) {}

  async getAllProjects(user: User): Promise<Project[]> {
    return this.projectQueries.getByUserId(user.id);
  }

  async newProject(
    user: User,
    createProjectDto: CreateProjectDto,
  ): Promise<number> {
    return this.projectQueries.createNewProject(createProjectDto, user.id);
  }

  async saveProject(
    user: User,
    projectId: number,
    project: CreateProjectDto,
    entities: Entity[],
  ): Promise<void> {
    const { userId } = await this.projectQueries.getProject(projectId);
    if (userId !== user.id) throw new ForbiddenException();
    await this.projectQueries.saveProject(projectId, project, entities);
  }

  async getProject(user: User, projectId: number): Promise<ReturnProjectDto> {
    const project = await this.projectQueries.getProject(projectId);
    if (!project) throw new NotFoundException();
    if (project.userId !== user.id) throw new ForbiddenException();
    const fullProject = await this.projectQueries.getFullProject(projectId);
    return fullProject;
  }

  async removeProject(user: User, projectId: number): Promise<void> {
    const project = await this.projectQueries.getProject(projectId);
    if (!project) throw new NotFoundException();
    if (project.userId !== user.id) throw new ForbiddenException();
    await this.projectQueries.deleteProject(projectId);
  }
}
