import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateProjectDto } from './dto/create-project.dto';
import { ReturnProjectDto } from './dto/return-project.dto';
import { Entity } from './entities/entity.entity';
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
        fields: 'fieldsjson',
      })
      .where('user_id', userId);
  }

  async createNewProject(
    project: CreateProjectDto,
    userId: number,
  ): Promise<number> {
    return (
      await this.knex('project')
        .insert({
          name: project.name,
          fieldsjson: project.fields,
          user_id: userId,
        })
        .returning('id')
    )[0];
  }

  async saveProject(
    projectId: number,
    project: CreateProjectDto,
    entities: Entity[],
  ) {
    await this.knex('project').where('id', projectId).update({
      name: project.name,
      fieldsjson: project.fields,
      updatedat: new Date(),
    });
    await this.knex('entity').delete().where('project_id', projectId);
    if (entities.length > 0) {
      await this.knex('entity').insert(
        entities.map((e) => ({
          id: e.id,
          x: e.x,
          y: e.y,
          type: e.type,
          project_id: e.projectId,
          fieldsjson: e.fields,
        })),
      );
    }
  }

  async getFullProject(projectId): Promise<ReturnProjectDto> {
    const project = (
      await this.knex('project')
        .select({
          id: 'id',
          userId: 'user_id',
          name: 'name',
          updatedAt: 'updatedat',
          createdAt: 'createdat',
          fields: 'fieldsjson',
        })
        .where('id', projectId)
    )[0];

    const entities = await this.knex('entity')
      .select({
        id: 'id',
        x: 'x',
        y: 'y',
        type: 'type',
        projectId: 'project_id',
        fields: 'fieldsjson',
      })
      .where('project_id', projectId);

    return {
      ...project,
      entities,
    };
  }

  async getProject(projectId: number): Promise<Project> {
    return (
      await this.knex('project')
        .select({
          id: 'id',
          userId: 'user_id',
          name: 'name',
          updatedAt: 'updatedat',
          createdAt: 'createdat',
          fields: 'fieldsjson',
        })
        .where('id', projectId)
    )[0];
  }

  async deleteProject(projectId: number): Promise<void> {
    await this.knex('entity').delete().where('project_id', projectId);
    await this.knex('project').delete().where('id', projectId);
  }
}
