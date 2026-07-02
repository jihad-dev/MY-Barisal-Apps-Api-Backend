import { IDoctor } from './doctor.interface';
import { Doctor } from './doctor.model';

const createDoctorIntoDB = async (payload: IDoctor) => {
  const result = await Doctor.create(payload);
  return result;
};

const getAllDoctorsFromDB = async (query: Record<string, unknown>) => {
  const searchTerm = query?.searchTerm || '';

  // ১. মেইন কুয়েরি অবজেক্ট তৈরি করুন
  const queryObj: any = {};

  // ২. যদি searchTerm থাকে, তবে $or কন্ডিশন যোগ হবে
  if (searchTerm) {
    queryObj.$or = [
      { name: { $regex: searchTerm, $options: 'i' } },
      { speciality: { $regex: searchTerm, $options: 'i' } },
      { chamberAddress: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  // ৩. 💡 ফ্রন্টএন্ড থেকে যদি 'area' (থানা) পাঠানো হয়, তবে সরাসরি কুয়েরিতে যুক্ত করুন
  if (query?.area) {
    queryObj.area = query.area; // হুবহু ডাটাবেজের 'area' ফিল্ডের সাথে মিলবে (যেমন: "Barisal Sadar")
  }

  // ৪. ফাইনাল কুয়েরি অবজেক্ট দিয়ে ডাটাবেজে সার্চ করুন
  const result = await Doctor.find(queryObj);
  return result;
};

export const DoctorServices = {
  createDoctorIntoDB,
  getAllDoctorsFromDB,
};