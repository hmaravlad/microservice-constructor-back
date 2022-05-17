import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectQueries } from './project.queries';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, ProjectQueries],
})
export class ProjectModule {}
