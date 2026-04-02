export interface IBank {
  name: string;
  branch: string;
  routingNumber?: string;
  address: string;
  phone: string[];
  isDeleted: boolean;
}