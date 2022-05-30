import { Entity } from '../entities/entity.entity';

export interface ReturnProjectDto {
  id: number;
  name: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  fields: string;
  entities: Entity[];
}
