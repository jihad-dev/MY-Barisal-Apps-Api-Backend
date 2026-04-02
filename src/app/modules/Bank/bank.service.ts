import { IBank } from './bank.interface';
import { Bank } from './bank.model';

const createBankIntoDB = async (payload: IBank) => {
  // একই ব্যাংকের একই শাখা আগে থেকে আছে কি না চেক
  const isExists = await Bank.findOne({ 
    name: payload.name, 
    branch: payload.branch 
  });

  if (isExists) {
    throw new Error('এই ব্যাংকের এই শাখাটি ইতিপূর্বেই যুক্ত করা হয়েছে!');
  }

  const result = await Bank.create(payload);
  return result;
};

const getAllBanksFromDB = async (query: Record<string, unknown>) => {
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  // নাম, শাখা বা ঠিকানা দিয়ে সার্চ করার সুবিধা
  const result = await Bank.find({
    $or: [
      { name: { $regex: searchTerm, $options: 'i' } },
      { branch: { $regex: searchTerm, $options: 'i' } },
      { address: { $regex: searchTerm, $options: 'i' } },
    ],
  });
  return result;
};

export const BankServices = {
  createBankIntoDB,
  getAllBanksFromDB,
};