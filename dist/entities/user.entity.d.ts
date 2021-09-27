import { BaseEntity } from 'typeorm';
import { Project } from './projects.entity';
export declare class User extends BaseEntity {
    id: string;
    projects: Project[];
    username: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    balance: number;
    role: string;
    status: string;
    isOnline: boolean;
    timezone: string;
    validatePassword(password: string): Promise<Boolean>;
}
