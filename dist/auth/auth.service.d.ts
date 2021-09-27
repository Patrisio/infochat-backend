import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { UserRepository } from './user.repository';
import { MailerService } from '@nestjs-modules/mailer';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private readonly mailerService;
    constructor(userRepository: UserRepository, jwtService: JwtService, mailerService: MailerService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<{
        code: number;
        status: string;
        projectId: number;
    }>;
    signIn(loginCredentialsDto: LoginCredentialsDto): Promise<{
        accessToken: string;
        projectId: number;
    }>;
    confirmInvite(inviteDto: any, inviteId: any): Promise<{
        statusCode: number;
        status: string;
    }>;
    getCurrentUser(accessToken: any): Promise<{
        username: string;
        phone: string;
        role: string;
        status: string;
        email: string;
        timezone: string;
        balance: number;
        isOnline: boolean;
        projects: any[];
    }>;
    sendEmail(teammateDto: any): Promise<{
        code: number;
        status: string;
    }>;
    decodeJwt(token: string): Promise<string | {
        [key: string]: any;
    }>;
}
