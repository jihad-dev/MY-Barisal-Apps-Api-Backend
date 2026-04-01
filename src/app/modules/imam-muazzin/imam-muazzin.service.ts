// imam-muazzin.service.ts
import ImamMuazzin from './imam-muazzin.model';
import { IImamMuazzin } from './imam-muazzin.interface';
import AppError from '../../errors/AppError';

// ── সব দেখা + search ──
const getAllImamMuazzin = async (query: Record<string, unknown>) => {
  const { search, role, status, upazila } = query;
  const filter: Record<string, unknown> = { isDeleted: false };

  if (role)   filter.role             = role;
  if (upazila) filter.upazila         = upazila;
  if (status) filter.employmentStatus = status;

  if (search) {
    filter.$or = [
      { name:        { $regex: search, $options: 'i' } },
      { upazila:     { $regex: search, $options: 'i' } },
      { union:       { $regex: search, $options: 'i' } },
      { village:     { $regex: search, $options: 'i' } },
      { fullAddress: { $regex: search, $options: 'i' } },
    ];
  }

  return await ImamMuazzin.find(filter).sort({ createdAt: -1 });
};

// ── একটা দেখা ──
const getSingleImamMuazzin = async (id: string) => {
  const result = await ImamMuazzin.findOne({ _id: id, isDeleted: false });
  if (!result) throw new AppError(404, 'তথ্য পাওয়া যায়নি।');
  return result;
};

// ── নিযুক্ত করো ──
const markAsHired = async (id: string) => {
  const person = await ImamMuazzin.findOne({ _id: id, isDeleted: false });
  if (!person) throw new AppError(404, 'তথ্য পাওয়া যায়নি।');
  if (person.employmentStatus === 'hired') {
    throw new AppError(400, 'এই ব্যক্তি ইতিমধ্যে নিযুক্ত।');
  }

  person.employmentStatus = 'hired';
  person.statusUpdatedAt  = new Date();
  await person.save();

  return { message: 'নিয়োগ কনফার্ম হয়েছে।', status: 'hired' };
};

// ── আবার খালি করো ──
const markAsAvailable = async (id: string) => {
  const person = await ImamMuazzin.findOne({ _id: id, isDeleted: false });
  if (!person) throw new AppError(404, 'তথ্য পাওয়া যায়নি।');
  if (person.employmentStatus === 'available') {
    throw new AppError(400, 'এই ব্যক্তি ইতিমধ্যে খালি আছেন।');
  }

  person.employmentStatus = 'available';
  person.statusUpdatedAt  = new Date();
  await person.save();

  return { message: 'আবার খালি করা হয়েছে।', status: 'available' };
};

// ── Admin CRUD ──
const createImamMuazzin = async (payload: IImamMuazzin) => {
  const isExist = await ImamMuazzin.findOne({
    name: payload.name,
    phone: payload.phone,
    isDeleted: false,
  });
  if (isExist) throw new AppError(409, 'এই ব্যক্তির তথ্য ইতিমধ্যে আছে।');
  return await ImamMuazzin.create(payload);
};

const updateImamMuazzin = async (id: string, payload: Partial<IImamMuazzin>) => {
  const result = await ImamMuazzin.findByIdAndUpdate(id, payload, { new: true });
  if (!result) throw new AppError(404, 'তথ্য পাওয়া যায়নি।');
  return result;
};

const deleteImamMuazzin = async (id: string) => {
  const result = await ImamMuazzin.findByIdAndUpdate(
    id, { isDeleted: true }, { new: true }
  );
  if (!result) throw new AppError(404, 'তথ্য পাওয়া যায়নি।');
  return result;
};

export const ImamMuazzinService = {
  getAllImamMuazzin,
  getSingleImamMuazzin,
  markAsHired,
  markAsAvailable,
  createImamMuazzin,
  updateImamMuazzin,
  deleteImamMuazzin,
};