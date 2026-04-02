// fire-service.interface.ts
export type TFireServiceType = 'government' | 'volunteer';
export type TFireServiceStatus = 'active' | 'inactive';

export interface IFireService {
    name: string;
    type: TFireServiceType;
    status: TFireServiceStatus;
    area: string;
    phone: string[];
    isDeleted: boolean;
}