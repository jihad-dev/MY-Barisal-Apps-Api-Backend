// lawyer.interface.ts
export type TLawyerType = 'civil' | 'criminal' | 'family' | 'corporate' | 'general';
export type TCourtType =
  | 'supreme'
  | 'high'
  | 'district'
  | 'magistrate'
  | 'labor'
  | 'other';

export interface ILawyer {
  name: string;
  designation: string;
  lawyerType: TLawyerType;
  courtType: TCourtType;
  barCouncilId?: string;
  area: string;
  address: string;
  phone: string[];
  experience?: number;
  isDeleted: boolean;
}