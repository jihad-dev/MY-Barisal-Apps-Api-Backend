// ব্লাড গ্রুপ এবং বরিশালের থানাগুলোর জন্য কাস্টম টাইপ
export type TBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type TBarisalThana =
  | "Barisal Sadar" | "Bakerganj" | "Babuganj" | "Wazirpur"
  | "Banaripara" | "Gournadi" | "Agailjhara" | "Mehendiganj"
  | "Muladi" | "Hizla";

export interface IDonor {
  name: string;
  bloodGroup: TBloodGroup; // string এর বদলে কাস্টম টাইপ
  area: TBarisalThana;     // string এর বদলে নির্দিষ্ট থানার টাইপ
  phone: string;
  lastDonationDate: string | null;
  isAvailable: boolean;
  isDeleted: boolean;
}