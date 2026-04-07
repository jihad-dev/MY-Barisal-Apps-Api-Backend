import { Model } from 'mongoose';

export interface IPharmacy {
    name: string;
    ownerName?: string;
    description?: string;
    area: string;
    address?: string;
    phone: string[];
    whatsapp?: string;
    locationUrl?: string;
    status: 'open' | 'closed';
    isHomeDelivery: boolean;
    isDeleted: boolean;
}

export type PharmacyModel = Model<IPharmacy, Record<string, unknown>>;