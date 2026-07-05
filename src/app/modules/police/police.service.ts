import { IPolice } from './police.interface';
import { Police } from './police.model';

const createPoliceIntoDB = async (payload: IPolice) => {
  const result = await Police.create(payload);
  return result;
};

const getAllPoliceFromDB = async (query: Record<string, unknown>) => {
  const searchTerm = query?.searchTerm || '';

  const result = await Police.find({
    $or: [
      { thanaName: { $regex: searchTerm, $options: 'i' } },
      { location: { $regex: searchTerm, $options: 'i' } },
      { ocName: { $regex: searchTerm, $options: 'i' } }, // <--- ওসির নাম দিয়েও সার্চ করা যাবে
    ],
  });
  return result;
};
const deletePoliceFromDB = async (id: string) => {
  const result = await Police.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true } // এটি আপডেট হওয়া নতুন ডাটাটি রিটার্ন করবে
  );
  return result;
};
export const PoliceServices = {
  createPoliceIntoDB,
  getAllPoliceFromDB,
  deletePoliceFromDB
};