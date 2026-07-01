// institution.interface.ts
export type TInstitutionType =
  | 'primary_school'
  | 'high_school'
  | 'college'
  | 'masjid'
  | 'madrasa'
  | 'university'
  | 'mandir';

export type TInstitutionStatus = 'active' | 'inactive';

export interface IInstitution {
  name: string;
  type: TInstitutionType;
  status: TInstitutionStatus;
  area: string;
  upazila: string;
  address: string;
  phone?: string[];
  established?: number;
  totalStudents?: number;
  isDeleted: boolean;
}