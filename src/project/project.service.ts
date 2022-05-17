import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { Project } from './entities/project.entity';
import { ProjectQueries } from './project.queries';

@Injectable()
export class ProjectService {
  constructor(private projectQueries: ProjectQueries) {}

  async getAllProjects(user: User): Promise<Project[]> {
    return this.projectQueries.getByUserId(user.id);
  }
}
