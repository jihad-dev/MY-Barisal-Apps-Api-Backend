import { Request, Response } from 'express';
import dayjs from 'dayjs';
import catchAsync from '../../utils/catchAsync';
import { DonorServices } from './donor.service';
import { sendResponse } from '../../utils/sendResponse';


// ১. সকল ডোনারদের তথ্য ফেচ করা (লজিকসহ)
const getAllDonors = catchAsync(async (req: Request, res: Response) => {
    const result = await DonorServices.getAllDonorsFromDB(req.query);

    const donorsWithStatus = result.map((donor: any) => {
        let canDonate = true;
        let daysRemaining = 0;

        if (donor.lastDonationDate) {
            const diff = dayjs().diff(dayjs(donor.lastDonationDate), 'day');
            if (diff < 90) {
                canDonate = false;
                daysRemaining = 90 - diff;
            }
        }

        const donorObj = donor.toObject ? donor.toObject() : donor;

        return {
            ...donorObj,
            canDonate,
            daysRemaining,
        };
    });

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Donors fetched successfully',
        data: donorsWithStatus,
    });
});

// ২. নতুন ডোনার রেজিস্টার করা
const registerDonor = catchAsync(async (req: Request, res: Response) => {
    const result = await DonorServices.createDonorIntoDB(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Donor registered successfully',
        data: result,
    });
});

// ৩. ডোনার আপডেট করা (যেমন: প্রোফাইল বা তারিখ পরিবর্তন)
const updateDonor = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DonorServices.updateDonorInDB(id, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Donor updated successfully',
        data: result,
    });
});


export const DonorControllers = {
    getAllDonors,
    registerDonor,
    updateDonor,
};