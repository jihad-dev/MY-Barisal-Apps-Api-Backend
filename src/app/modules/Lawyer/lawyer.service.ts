// lawyer.service.ts
import Lawyer from './lawyer.model';
import { ILawyer } from './lawyer.interface';
import AppError from '../../errors/AppError';

const getAllLawyers = async (query: Record<string, unknown>) => {
  const { search, lawyerType, courtType, area } = query;
  const filter: Record<string, unknown> = { isDeleted: false };

  if (lawyerType) filter.lawyerType = lawyerType;
  if (courtType) filter.courtType = courtType;
  if (area) filter.area = area;

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { designation: { $regex: search, $options: 'i' } },
      { area: { $regex: search, $options: 'i' } },
      { address: { $regex: search, $options: 'i' } },
    ];
  }

  return await Lawyer.find(filter).sort({ createdAt: -1 });
};

const createLawyer = async (payload: ILawyer) => {
  const isExist = await Lawyer.findOne({
    name: payload.name,
    phone: payload.phone,
    isDeleted: false,
  });
  if (isExist) throw new AppError(409, `'${payload.name}' ইতিমধ্যে আছে।`);
  return await Lawyer.create(payload);
};

const deleteLawyer = async (id: string) => {
  const result = await Lawyer.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!result) throw new AppError(404, 'তথ্য পাওয়া যায়নি।');
  return result;
};

export const LawyerService = {
  getAllLawyers,
  createLawyer,
  deleteLawyer,
};