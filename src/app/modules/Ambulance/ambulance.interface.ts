

export type TAmbulanceType = 'government' | 'private' | 'volunteer';

export interface IAmbulance {
  
  name: string;
  type: TAmbulanceType;
  thana: string;      // নতুন যুক্ত করা হলো
  area: string;
  phone: string[];
  isDeleted: boolean;
  createdAt?: string;
}