import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { TeammateDataDto } from '../teammates/dto/teammate-data.dto';
import { User } from '../entities/user.entity';
export declare class UserRepository extends Repository<User> {
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<{
        code: number;
        status: string;
        projectId: number;
    }>;
    validateUserPassword(password: string, user: User): Promise<Boolean>;
    getTeammatesByProjectId(projectId: any): Promise<any[]>;
    updateTeammate(teammateDto: TeammateDataDto, token: string): Promise<{
        code: number;
        token: string;
        status: string;
    }>;
    addTeammate(teammateDto: any): Promise<{
        code: number;
        status: string;
    }>;
    updateTeammateByInviteId(inviteDto: any, email: any): Promise<{
        statusCode: number;
        status: string;
    }>;
    deleteTeammate(email: string): Promise<{
        code: number;
        status: string;
    }>;
    getCurrentUser(email: string): Promise<{
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
    private hashPassword;
    private between;
}
