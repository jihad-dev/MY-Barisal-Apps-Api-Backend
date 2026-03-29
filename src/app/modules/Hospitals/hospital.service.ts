// hospital.service.ts
import Hospital from './hospital.model';
import { IHospital } from './hospital.interface';
import AppError from '../../errors/AppError';

const getAllHospitals = async (query: Record<string, unknown>) => {
  const { type, area, search } = query;
  const filter: Record<string, unknown> = { isDeleted: false };

  if (type) filter.type = type;
  if (area) filter.area = area;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { area: { $regex: search, $options: 'i' } },
    ];
  }

  return await Hospital.find(filter).sort({ createdAt: -1 });
};

const getSingleHospital = async (id: string) => {
  return await Hospital.findOne({ _id: id, isDeleted: false });
};

const createHospital = async (payload: IHospital) => {
  // একই নামে আগে থেকে হাসপাতাল আছে কিনা চেক করো
  const isExist = await Hospital.findOne({
    name: payload.name,
    isDeleted: false,
  });

  if (isExist) {
    throw new AppError(409, `'${payload.name}' নামে হাসপাতাল ইতিমধ্যে আছে!`);
  }

  return await Hospital.create(payload);
};

const updateHospital = async (id: string, payload: Partial<IHospital>) => {
  // নাম আপডেট করলে সেটাও চেক করো
  if (payload.name) {
    const isExist = await Hospital.findOne({
      name: payload.name,
      isDeleted: false,
      _id: { $ne: id }, // নিজেকে বাদ দিয়ে চেক
    });

    if (isExist) {
      throw new AppError(409, `'${payload.name}' নামে হাসপাতাল ইতিমধ্যে আছে!`);
    }
  }

  return await Hospital.findByIdAndUpdate(id, payload, { new: true });
};

const deleteHospital = async (id: string) => {
  return await Hospital.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

export const HospitalService = {
  getAllHospitals,
  getSingleHospital,
  createHospital,
  updateHospital,
  deleteHospital,
};