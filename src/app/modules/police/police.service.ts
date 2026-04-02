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

export const PoliceServices = {
  createPoliceIntoDB,
  getAllPoliceFromDB,
};