
import Ambulance from './ambulance.model';
import { IAmbulance } from './ambulance.interface';
import AppError from '../../errors/AppError';

const getAllAmbulances = async (query: Record<string, unknown>) => {
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

  return await Ambulance.find(filter).sort({ createdAt: -1 });
};

const createAmbulance = async (payload: IAmbulance) => {
  const isExist = await Ambulance.findOne({
    name: payload.name,
    isDeleted: false,
  });

  if (isExist) {
    throw new AppError(409, `'${payload.name}' ইতিমধ্যে আছে!`);
  }

  return await Ambulance.create(payload);
};


const deleteAmbulance = async (id: string) => {
  return await Ambulance.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

export const AmbulanceService = {
  getAllAmbulances,
  createAmbulance,
  deleteAmbulance,
};