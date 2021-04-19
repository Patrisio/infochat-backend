import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { Project } from './projects.entity';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {

}