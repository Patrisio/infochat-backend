import { Repository } from 'typeorm';
import { ChangesHistory } from '../entities/changesHistory.entity';
export declare class ChangesHistoryRepository extends Repository<ChangesHistory> {
    getChangesHistory(clientId: string): Promise<any>;
    addChanges(projectId: any, clientId: any, clientDataDto: any): Promise<void>;
}
