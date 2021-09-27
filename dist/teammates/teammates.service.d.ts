import { UserRepository } from '../auth/user.repository';
import { JwtService } from '@nestjs/jwt';
export declare class TeammatesService {
    private userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    getTeammatesByProjectId(projectId: any): Promise<any[]>;
    addTeammate(teammateDto: any): Promise<{
        code: number;
        status: string;
    }>;
    updateTeammate(teammateDto: any, projectId: any): Promise<{
        code: number;
        token: string;
        status: string;
    }>;
    confirmInvite(inviteDto: any, inviteId: any): Promise<{
        statusCode: number;
        status: string;
    }>;
    deleteTeammate(emailObject: {
        email: string;
    }): Promise<{
        code: number;
        status: string;
    }>;
}
