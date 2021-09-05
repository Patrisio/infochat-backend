import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository, Connection, getConnection } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { TeammateDataDto } from '../teammates/dto/teammate-data.dto';
import { User } from '../entities/user.entity';
import { Project } from '../entities/projects.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    console.log('CONTROLLER');
    const { username, phone, email, password, role, status } = authCredentialsDto;

    const user = new User();
    const project = new Project();
    
    user.username = username;
    user.phone = phone;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.role = role;
    user.status = status;
    user.balance = 0;
    
    try {
      project.name = 'project_name333';
      await user.save();
      project.users = [user];

      const projectData = await project.save();
      user.projects = [project];
      await user.save();

      return {
        code: 200,
        status: 'success',
        projectId: projectData.id
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Пользователь с таким email уже существует');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(password: string, user: User): Promise<Boolean> {
    return await user.validatePassword(password);
  }

  async getTeammatesByProjectId(projectId) {
    const projectRepository = await getConnection().getRepository(Project);
    const projects = await projectRepository.find({ relations: ["users"] });
    const project = projects.find((project) => project.id === parseInt(projectId));
    const teammates = project.users;
    const formattedTeammates = [];

    for (let { id, username, email, status, role, isOnline } of teammates) {
      const operator = {
        id, username, email, status, role, isOnline,
      };
      formattedTeammates.push(operator);
    }

    return formattedTeammates;
  }

  async updateTeammate(teammateDto: TeammateDataDto, token: string) {
    const { password, oldEmail, ...updatedTeammateData } = teammateDto;
    let teammateData: any = updatedTeammateData;

    if (password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await this.hashPassword(password, salt);

      teammateData = {
        ...teammateData,
        salt,
        password: hashedPassword,
      };
    }
    
    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set(teammateData)
        .where('email = :oldEmail', { oldEmail })
        .execute();

      return {
        code: 200,
        token: token ? token : null,
        status: 'success',
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async addTeammate(teammateDto) {
    const { projectId, email, role, status, username } = teammateDto;

    const user = new User();

    const projectRepository = await getConnection().getRepository(Project);
    const projects = await projectRepository.find({ relations: ["users"] });
    const project = projects.find((project) => project.id === parseInt(projectId));

    user.email = email;
    user.role = role;
    user.status = status;
    user.username = username;

    try {
      await user.save();

      const users = await this.find({ relations: ["projects"] });
      const foundUser = users.find((user) => user.email === email);
      
      project.users = [...project.users, user];
      project.save();
      foundUser.projects = [...foundUser.projects, project];
      await user.save();
      console.log(foundUser.projects, 'user.projects');
      return {
        code: 200,
        status: 'success'
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Пользователь с таким email уже существует');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async updateTeammateByInviteId(inviteDto, email) {
    const { username, password, projectId } = inviteDto;

    const projectRepository = await getConnection().getRepository(Project);
    const projects = await projectRepository.find({ relations: ["users"] });
    const project = projects.find((project) => project.id === parseInt(projectId));
    const user = await this.findOne({ email });

    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.username = username;
    user.status = 'active';

    try {
      await user.save();
      project.users = [...project.users, user];
      project.save();

      return {
        code: 200,
        status: 'success'
      };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTeammate(email: string) {
    const result = await this.delete({ email });

    if (result.affected === 0) {
      throw new NotFoundException(`Teammate with email "${email}" not found`);
    }

    return {
      code: 200,
      status: 'success'
    };
  }

  async getCurrentUser(email: string) {
    const users = await this.find({ relations: ["projects"] });
    const {
      username, phone, role, status,
      timezone, projects, balance, isOnline,
    } = users.find((user) => user.email === email);
    const resultProjects = [];

    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];

      project.users = await getConnection()
        .createQueryBuilder()
        .relation(Project, 'users')
        .of(project)
        .loadMany();

      resultProjects.push({
        id: project.id,
        name: project.name,
        teammatesCount: project.users.length,
      });
    }

    return {
      username,
      phone,
      role, 
      status,
      email,
      timezone,
      balance,
      isOnline,
      projects: resultProjects,
    };
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  private between(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
  }
}