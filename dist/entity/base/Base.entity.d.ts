import { BaseEntity } from 'typeorm';
export declare abstract class Base extends BaseEntity {
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
