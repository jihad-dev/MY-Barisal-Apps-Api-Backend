// imam-muazzin.interface.ts
export type TRole = 'imam' | 'muazzin' | 'both';
export type TEmploymentStatus = 'available' | 'hired';

export interface IImamMuazzin {
  name: string;
  role: TRole;
  phone: string;
  division: string;
  district: string;
  upazila: string;
  union?: string;
  village?: string;
  fullAddress: string;
  employmentStatus: TEmploymentStatus;
  statusUpdatedAt?: Date;
  isDeleted: boolean;
}