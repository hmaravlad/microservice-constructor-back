import { Entity } from '../entities/entity.entity';
import { CreateProjectDto } from './create-project.dto';

export interface SaveProjectDto {
  project: CreateProjectDto;
  entities: Entity[];
}
