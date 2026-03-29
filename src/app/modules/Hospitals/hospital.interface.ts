
export type THospitalType = 'government' | 'private' | 'clinic' | 'diagnostic';
export interface IHospital {
  name: string;
  type: THospitalType;
  address: string;
  area: string;
  phone: string[];
  isDeleted: boolean;
}