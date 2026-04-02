export interface IPolice {
  thanaName: string;
  location: string;
  ocName: string;         // <--- নতুন যোগ করা হয়েছে
  ocNumber: string;
  dutyOfficer: string;
  controlRoom?: string;
  isDeleted: boolean;
}