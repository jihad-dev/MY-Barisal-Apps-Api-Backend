import { IDonor } from "./donor.interface";
import { Donor } from "./donor.model";

/**
 * ডাটাবেসে নতুন ডোনার রেজিস্টার করা
 */
const createDonorIntoDB = async (payload: IDonor) => {
    // ১. চেক করা হচ্ছে এই ফোন নম্বর দিয়ে অলরেডি কেউ আছে কি না
    const isDonorExists = await Donor.findOne({
        phone: payload.phone,
        isDeleted: false // যারা ডিলিট হয়নি শুধু তাদের চেক করবে
    });

    if (isDonorExists) {
        // যদি থাকে তবে একটি এরর থ্রো করবে যা catchAsync হ্যান্ডেল করবে
        throw new Error('এই মোবাইল নম্বরটি দিয়ে অলরেডি একজন ডোনার নিবন্ধিত আছেন!');
    }

    // ২. যদি না থাকে তবেই নতুন ডোনার তৈরি হবে
    const result = await Donor.create(payload);
    return result;
};

/**
 * সব ডোনারের লিস্ট আনা (ফিল্টারসহ)
 */
const getAllDonorsFromDB = async (query: Record<string, unknown>) => {
    const { bloodGroup, area, searchTerm } = query;
    const filter: any = { isDeleted: false };

    // ব্লাড গ্রুপ অনুযায়ী ফিল্টার
    if (bloodGroup) {
        filter.bloodGroup = bloodGroup;
    }

    // এরিয়া অনুযায়ী ফিল্টার
    if (area) {
        filter.area = area;
    }

    // নাম দিয়ে সার্চ করার সুবিধা (বড় প্রজেক্টের জন্য কাজে দেবে)
    if (searchTerm) {
        filter.name = { $regex: searchTerm, $options: 'i' };
    }

    const result = await Donor.find(filter).sort({ createdAt: -1 });
    return result;
};


/**
 * ডোনারের তথ্য আপডেট করা (যেমন: রক্ত দেওয়ার পর তারিখ আপডেট)
 */
const updateDonorInDB = async (id: string, payload: Partial<IDonor>) => {
    const result = await Donor.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};


export const DonorServices = {
    createDonorIntoDB,
    getAllDonorsFromDB,
    updateDonorInDB,

};