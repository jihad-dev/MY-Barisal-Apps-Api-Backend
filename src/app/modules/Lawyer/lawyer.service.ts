// lawyer.service.ts
import Lawyer from './lawyer.model';
import { ILawyer } from './lawyer.interface';
import AppError from '../../errors/AppError';

const getAllLawyers = async (query: Record<string, unknown>) => {
  const { search, lawyerType, courtType, area } = query;

  // 'isDeleted: false' সরাসরি না লিখে '$ne: true' লিখলে ডাটাবেজে ফিল্ডটি না থাকলেও ডাটা চলে আসবে
  const filter: Record<string, unknown> = {
    isDeleted: { $ne: true }
  };

  // যদি কুয়েরি প্যারামিটারে ভ্যালু থাকে এবং তা খালি স্ট্রিং না হয়, তবেই ফিল্টার যুক্ত হবে
  if (lawyerType && lawyerType !== 'undefined' && lawyerType !== '') {
    filter.lawyerType = lawyerType;
  }
  if (courtType && courtType !== 'undefined' && courtType !== '') {
    filter.courtType = courtType;
  }
  if (area && area !== 'undefined' && area !== '') {
    // যদি ফ্রন্টএন্ড থেকে আংশিক কুয়েরি আসে, তার জন্য regex ব্যবহার করা নিরাপদ
    filter.area = { $regex: area, $options: 'i' };
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { designation: { $regex: search, $options: 'i' } },
      { area: { $regex: search, $options: 'i' } },
      { specialty: { $regex: search, $options: 'i' } }, // specialty যুক্ত করা হলো
      { chamberAddress: { $regex: search, $options: 'i' } }, // address বদলে chamberAddress করা হলো
    ];
  }

  console.log("Final Database Filter Object:", JSON.stringify(filter)); // ডিবাগিং এর জন্য লগ

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