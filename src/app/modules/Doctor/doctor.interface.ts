export interface IDoctor {
  name: string;
  speciality: string;       // যেমন: কার্ডিওলজিস্ট, নিউরোলজিস্ট
  degree: string;           // যেমন: MBBS, FCPS
  experience?: string;      // যেমন: ১০ বছরের অভিজ্ঞতা
  area: string;             // 💡 নতুন ফিল্ড (যেমন: Bakerganj, Barisal Sadar বা উজিরপুর)
  chamberAddress: string;
  visitingHours: string;    // যেমন: সন্ধ্যা ৬টা - রাত ৯টা
  phone: string[];          // সিরিয়ালের জন্য একাধিক নম্বর
  isDeleted: boolean;
}