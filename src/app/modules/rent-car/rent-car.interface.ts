// rent-car.interface.ts
export type TCarType =
  | 'microbus'
  | 'car'
  | 'jeep'
  | 'pickup'
  | 'truck'
  | 'bus'
  | 'cng'
  | 'auto'
  | 'hiace'
  | 'noah'
  | 'ambulance';

export type TCarStatus = 'available' | 'rented' | 'maintenance';

export interface IRentCar {
  // ── সার্ভিসের তথ্য ──
  serviceName: string;       // বাঁশখালী কার এন্ড হাইস রেন্ট সার্ভিস
  proprietorName: string;    // প্রোপাইটর: এনামুল হক
  description: string;       // এখানে এসি নন এসি মাইক্রো...
  carTypes: TCarType[];      // ['microbus', 'car', 'hiace', 'noah']
  serviceArea: string;       // বাঁশখালী থেকে সমগ্র বাংলাদেশ
  area: string;              // এলাকা
  thana: string;           // উপজেলা
  phone: string[];           // কল করুন
  whatsapp?: string;         // মেসেজ করুন (WhatsApp)
  rentPerDay?: number;
  rentPerTrip?: number;
  status: TCarStatus;
  isDeleted: boolean;
}