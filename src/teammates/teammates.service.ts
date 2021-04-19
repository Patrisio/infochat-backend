import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user.repository';

@Injectable()
export class TeammatesService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getTeammatesByProjectId(projectId) {
    return this.userRepository.getTeammatesByProjectId(projectId);
  }

  async addTeammate(teammateDto) {
    return this.userRepository.addTeammate(teammateDto);
  }

  async confirmInvite(inviteDto, inviteId) {
    return this.userRepository.updateTeammateByInviteId(inviteDto, inviteId);
  }

  async deleteTeammate(emailObject: {email: string}) {
    const { email } = emailObject;
    return this.userRepository.deleteTeammate(email);
  }

  async updateDialogForAllTeammates(projectId, dialogUpdates) {
    return this.userRepository.updateDialogForAllTeammates(projectId, dialogUpdates);
  }
}
