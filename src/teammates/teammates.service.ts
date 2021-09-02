import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TeammatesService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async getTeammatesByProjectId(projectId) {
    return this.userRepository.getTeammatesByProjectId(projectId);
  }

  async addTeammate(teammateDto) {
    return this.userRepository.addTeammate(teammateDto);
  }

  async updateTeammate(teammateDto, projectId) {
    const token = await this.jwtService.sign({ email: teammateDto.email });
    return this.userRepository.updateTeammate(teammateDto, token);
  }

  async confirmInvite(inviteDto, inviteId) {
    return this.userRepository.updateTeammateByInviteId(inviteDto, inviteId);
  }

  async deleteTeammate(emailObject: {email: string}) {
    const { email } = emailObject;
    return this.userRepository.deleteTeammate(email);
  }
}
