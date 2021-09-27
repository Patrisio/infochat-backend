import { TeammatesService } from './teammates.service';
import { TeammateDto } from './dto/teammate.dto';
import { TeammateDataDto } from './dto/teammate-data.dto';
export declare class TeammatesController {
    private teammatesService;
    constructor(teammatesService: TeammatesService);
    getTeammatesByProjectId(projectId: any): Promise<any[]>;
    addTeammate(projectId: any, teammateDto: TeammateDto): Promise<{
        code: number;
        status: string;
    }>;
    updateTeammate(projectId: any, teammateDataDto: TeammateDataDto): Promise<{
        code: number;
        token: string;
        status: string;
    }>;
    deleteTeammate(emailObject: any): Promise<{
        code: number;
        status: string;
    }>;
}
