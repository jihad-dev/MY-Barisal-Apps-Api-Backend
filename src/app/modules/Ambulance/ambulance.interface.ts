
export type TAmbulanceType = 'government' | 'private' | 'volunteer';

export interface IAmbulance {
  name: string;
  type: TAmbulanceType;
  area: string;
  phone: string[];
  isDeleted: boolean;
}