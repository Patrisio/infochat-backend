import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { InviteDto } from '../auth/dto/invite.dto';
import { TeammateDto } from '../teammates/dto/teammate.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<{
        code: number;
        status: string;
    }>;
    signIn(loginCredentialsDto: LoginCredentialsDto): Promise<{
        accessToken: string;
        projectId: number;
    }>;
    sendEmail(projectId: any, teammateDto: TeammateDto): Promise<{
        code: number;
        status: string;
    }>;
    confirmInvite(inviteId: any, inviteDto: InviteDto): Promise<{
        statusCode: number;
        status: string;
    }>;
    getCurrentUser(headers: any): Promise<{
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
    decodeJwt(token: any): Promise<string | {
        [key: string]: any;
    }>;
}
