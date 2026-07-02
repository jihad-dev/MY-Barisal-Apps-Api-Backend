
export type THospitalType = 'government' | 'private' | 'clinic' | 'diagnostic';

export interface IHospital {
  name: string;
  type: THospitalType;
  address: string;
  thana: string;     // এটি যোগ করুন (যেমন: Bakerganj, Babuganj, Sadar)
  area: string;      
  phone: string[];
  isDeleted: boolean;
}