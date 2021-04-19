import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { UserRepository } from './user.repository';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<{code: number, status: string}> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(loginCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string, projectId: number }> {
    const output = await this.userRepository.validateUserPassword(loginCredentialsDto);
    console.log(output);
    if (!output.projectId) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: output.email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken, projectId: output.projectId };
  }

  async confirmInvite(inviteDto, inviteId) {
    const { email } = await this.jwtService.verify(inviteId);
    return this.userRepository.updateTeammateByInviteId(inviteDto, email);
  }

  async getCurrentUser(accessToken) {
    const { email } = await this.jwtService.verify(accessToken);
    return this.userRepository.getCurrentUser(email);
  }

  async sendEmail(teammateDto) {
    const { inviteId, projectId, email } = teammateDto;

    const payload = { email };
    const accessToken = await this.jwtService.sign(payload);

    this
      .mailerService
      .sendMail({
        to: email,
        from: 'noreply@nestjs.com',
        subject: 'Testing Nest MailerModule ✔',
        text: 'welcome',
        html: `<b>Присоединяйтесь к команде infochat</b><br /><a href="http://localhost:3001/project/${projectId}/teammate/invite/${accessToken}">Присоединиться</a>`,
      })
      .then(() => {
        console.log('EMAIL HAVE SENT SUCCESSFULLY');
      })
      .catch((err) => {
        console.log('Erorr');
        console.log(err);
      });
  }
}
