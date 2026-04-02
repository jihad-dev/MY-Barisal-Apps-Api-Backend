export interface IPolice {
  thanaName: string;      // থানার নাম (যেমন: কোতোয়ালী মডেল থানা)
  location: string;       // থানার ঠিকানা
  ocNumber: string;       // ওসির মোবাইল নম্বর
  dutyOfficer: string;    // ডিউটি অফিসারের নম্বর
  controlRoom?: string;   // কন্ট্রোল রুমের নম্বর (ঐচ্ছিক)
  isDeleted: boolean;
}