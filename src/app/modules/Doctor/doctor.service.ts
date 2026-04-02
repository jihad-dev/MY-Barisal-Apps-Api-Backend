import { IDoctor } from './doctor.interface';
import { Doctor } from './doctor.model';

const createDoctorIntoDB = async (payload: IDoctor) => {
  const result = await Doctor.create(payload);
  return result;
};

const getAllDoctorsFromDB = async (query: Record<string, unknown>) => {
  const searchTerm = query?.searchTerm || '';
  
  // নাম বা স্পেশালিটি (যেমন: Heart, Kidney) দিয়ে সার্চ
  const result = await Doctor.find({
    $or: [
      { name: { $regex: searchTerm, $options: 'i' } },
      { speciality: { $regex: searchTerm, $options: 'i' } },
      { chamberAddress: { $regex: searchTerm, $options: 'i' } },
    ],
  });
  return result;
};

export const DoctorServices = {
  createDoctorIntoDB,
  getAllDoctorsFromDB,
};