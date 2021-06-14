import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { Project } from '../entities/projects.entity';
import { User } from '../entities/user.entity';
import { ProjectDto } from './dto/project.dto';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async addProject(projectDto: ProjectDto) {
    const { name, timezone, email } = projectDto;
    const users = await User.find({ relations: ['projects'] });
    const foundUser = users.find((user) => user.email === email);

    if (foundUser) {
      try {
        const project = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Project)
          .values({ name, timezone })
          .execute();

        const projectId = project.raw[0].id;
        await getConnection()
          .createQueryBuilder()
          .relation(User, 'projects')
          .of(foundUser.id)
          .add({ id: projectId, name, timezone });

        return { id: projectId };
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }
}