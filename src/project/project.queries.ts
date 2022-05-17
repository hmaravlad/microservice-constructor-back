import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectQueries {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async getByUserId(userId: number): Promise<Project[]> {
    return this.knex('project')
      .select({
        id: 'id',
        userId: 'user_id',
        name: 'name',
        updatedAt: 'updatedat',
        createdAt: 'createdat',
      })
      .where('user_id', userId);
  }
}
