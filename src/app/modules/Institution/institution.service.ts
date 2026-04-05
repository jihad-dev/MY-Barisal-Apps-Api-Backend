// institution.service.ts
import Institution from './institution.model';
import { IInstitution } from './institution.interface';
import AppError from '../../errors/AppError';

const getAllInstitutions = async (query: Record<string, unknown>) => {
  const { type, area, upazila, search } = query;
  const filter: Record<string, unknown> = {
    isDeleted: false,
    status: 'active',
  };

  if (type)    filter.type    = type;
  if (area)    filter.area    = area;
  if (upazila) filter.upazila = upazila;

  if (search) {
    filter.$or = [
      { name:    { $regex: search, $options: 'i' } },
      { area:    { $regex: search, $options: 'i' } },
      { upazila: { $regex: search, $options: 'i' } },
      { address: { $regex: search, $options: 'i' } },
    ];
  }

  return await Institution.find(filter).sort({ createdAt: -1 });
};



const createInstitution = async (payload: IInstitution) => {
  const isExist = await Institution.findOne({
    name:      payload.name,
    isDeleted: false,
  });
  if (isExist) throw new AppError(409, `'${payload.name}' ইতিমধ্যে আছে।`);
  return await Institution.create(payload);
};



const deleteInstitution = async (id: string) => {
  const result = await Institution.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!result) throw new AppError(404, 'তথ্য পাওয়া যায়নি।');
  return result;
};

export const InstitutionService = {
  getAllInstitutions,
  createInstitution,
  deleteInstitution,
};