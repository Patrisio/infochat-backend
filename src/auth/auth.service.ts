import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { UserRepository } from './user.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { Tariff } from '../entities/tariff.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<{code: number, status: string, projectId: number}> {
    const signUpResponse = await this.userRepository.signUp(authCredentialsDto);

    if (signUpResponse.code === 200) {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Tariff)
        .values({
          project: signUpResponse.projectId,
        })
        .execute();
    }

    return signUpResponse;
  }

  async signIn(loginCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string, projectId: number }> {
    const { email, password } = loginCredentialsDto;
    const user = await this.userRepository.findOne({ email });

    let users;
    if (user) {
      users = await this.userRepository.find({ relations: ['projects'] });
    } else {
      throw new UnauthorizedException('Такого пользователя не существует');
    }

    const foundUser = users.find((userItem: any) => userItem.id === user.id);
    let projectId;
    if (foundUser) {
      projectId = foundUser.projects[0].id;
    }

    const isCorrectPassword = await this.userRepository.validateUserPassword(password, user);
    if (isCorrectPassword) {
      const accessToken = await this.jwtService.sign({ email });

      return {
        accessToken,
        projectId,
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
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
    const { projectId, email } = teammateDto;

    const payload = { email };
    const accessToken = await this.jwtService.sign(payload);

    this
      .mailerService
      .sendMail({
        to: email,
        from: 'noreply@nestjs.com',
        subject: 'Testing Nest MailerModule ✔',
        text: 'welcome',
        html: `<b>Присоединяйтесь к команде infochat</b><br /><a href="http://localhost:3000/project/${projectId}/teammate/invite/${accessToken}">Присоединиться</a>`,
      })
      .then(() => {
        console.log('EMAIL HAVE SENT SUCCESSFULLY');
      })
      .catch((err) => {
        console.log('Erorr');
        console.log(err);
      });

      return {
        code: 200,
        status: 'success',
      }
  }

  async decodeJwt(token: string) {
    const decodeToken = await this.jwtService.decode(token);
    return decodeToken;
  }
}
