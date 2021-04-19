import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository, Connection, getConnection } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { User } from './user.entity';
import { Project } from './projects.entity';
import * as bcrypt from 'bcrypt';
import { ProjectRepository } from './projects.repository';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { username, phone, email, password, role, status } = authCredentialsDto;
    const user = new User();
    const project = new Project();
    
    user.username = username;
    user.phone = phone;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    // user.project_id = this.between(100000, 999999);
    user.role = role;
    user.status = status;

    try {
      project.name = 'project_name333';
      const projectData = await project.save();
      user.project_id = projectData.id;

      await user.save();

      project.users =[user];
      await project.save();

      return {
        code: 200,
        status: 'success',
        projectId: String(projectData.id)
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User with this email already exist');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(loginCredentialsDto: LoginCredentialsDto): Promise<{ projectId: number, email: string }> {
    const { email, password } = loginCredentialsDto;
    const user = await this.findOne({ email });

    if (user && await user.validatePassword(password)) {
      return {
        projectId: user.project_id,
        email: user.email
      };
    } else {
      return null;
    }
  }

  async getTeammatesByProjectId(projectId) {
    // const teammates = await this.find({ project_id: projectId });
    const projectRepository = await getConnection().getRepository(Project);
    const projects = await projectRepository.find({ relations: ["users"] });
    const project = projects.find((project) => project.id === parseInt(projectId));
    console.log(project)
    const teammates = project.users;
    const formattedTeammates = [];

    for (let { id, username, email, status, role,
      all_client_ids, unread_count, unread_client_ids,
      assigned_count, assigned_client_ids,
      opened_count, opened_client_ids } of teammates) {
      const operator = {
        id, username, email, status, role, 
        all_client_ids, unread_count, unread_client_ids,
        assigned_count, assigned_client_ids,
        opened_count, opened_client_ids 
      };
      formattedTeammates.push(operator);
    }

    return formattedTeammates;
  }

  async addTeammate(teammateDto) {
    const { inviteId, projectId, email, role, status, username } = teammateDto;

    const user = new User();

    const projectRepository = await getConnection().getRepository(Project);
    const projects = await projectRepository.find({ relations: ["users"] });
    const project = projects.find((project) => project.id === parseInt(projectId));

    user.invite_id = inviteId;
    user.project_id = parseInt(projectId);
    user.email = email;
    user.role = role;
    user.status = status;
    user.username = username;

    try {
      await user.save();
      
      project.users = [...project.users, user];
      project.save();

      return {
        code: 200,
        status: 'success'
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User with this email already exist');
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

    const user = await this.findOne({ project_id: parseInt(projectId), email });
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
    const {
      all_client_ids, unread_count, unread_client_ids,
      assigned_count, assigned_client_ids,
      opened_count, opened_client_ids,
      username, phone, role, status, closed_count, closed_client_ids
    } = await this.findOne({ email });

    return {
      allClientIds: all_client_ids,
      unreadCount: unread_count,
      unreadClientIds: unread_client_ids,
      assignedCount: assigned_count,
      assignedClientIds: assigned_client_ids,
      openedCount: opened_count,
      openedClientIds: opened_client_ids,
      closedCount: closed_count,
      closedClientIds: closed_client_ids,
      username,
      phone,
      role, 
      status,
      email
    };
  }

  async updateDialogForAllTeammates(projectId: any, dialogUpdates: any) {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({
          unread_count: dialogUpdates.unreadCount,
          unread_client_ids: dialogUpdates.unreadClientIds
        })
        .where("project_id = :project_id", { project_id: parseInt(projectId) })
        .execute();

      return {
        code: 200,
        status: 'success'
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async updateOpenedDialogForAllTeammates(projectId: any, dialogUpdates: any) {
    try {
      await getConnection()         
        .createQueryBuilder()
        .update(User) 
        .set({
          opened_count: dialogUpdates.openedCount,
          opened_client_ids: dialogUpdates.openedClientIds
        })
        .where("project_id = :project_id", { project_id: parseInt(projectId) })
        .execute();

      return {
        code: 200,
        status: 'success'
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async updateAssignedUserByEmail(assignedDto) {
    const { email, assignedClientIds, assignedCount } = assignedDto;

    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({
          assigned_count: assignedCount,
          assigned_client_ids: assignedClientIds
        })
        .where("email = :email", { email })
        .execute();

        return {
        code: 200,
        status: 'success'
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async updateClosedUserByEmail(assignedDto) {
    const { email, closedClientIds, closedCount } = assignedDto;

    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({
          closed_count: closedCount,
          closed_client_ids: closedClientIds
        })
        .where("email = :email", { email })
        .execute();

        return {
          code: 200,
          status: 'success'
        };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
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