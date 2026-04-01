export type TBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface IDonor {
  name: string;
  bloodGroup: TBloodGroup;
  area: string;
  phone: string;
  lastDonationDate: string | null; // YYYY-MM-DD ফরম্যাটে থাকবে
  isAvailable: boolean;
  isDeleted: boolean;
}