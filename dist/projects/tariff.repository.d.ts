import { Repository } from 'typeorm';
import { Tariff } from '../entities/tariff.entity';
import { TariffPlanDto } from './dto/tariffPlan.dto';
export declare class TariffRepository extends Repository<Tariff> {
    getTariffPlanByProjectId(projectId: number): Promise<{
        code: number;
        tariffPlan: {
            id: string;
            count: number;
        }[];
    }>;
    updateTariffPlanByProjectId(projectId: number, tariffPlanDto: TariffPlanDto): Promise<{
        code: number;
        status: string;
    }>;
}
