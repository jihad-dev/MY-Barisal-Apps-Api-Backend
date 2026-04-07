import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { PharmacyServices } from './pharmacy.service';
import { sendResponse } from '../../utils/sendResponse';

// ১. নতুন ফার্মেসি তৈরি করা
const createPharmacy = catchAsync(async (req: Request, res: Response) => {
    const result = await PharmacyServices.createPharmacyIntoDB(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Pharmacy created successfully',
        data: result,
    });
});

// ২. সকল ফার্মেসি খুঁজে বের করা (Query সহ)
const getAllPharmacies = catchAsync(async (req: Request, res: Response) => {
    const result = await PharmacyServices.getAllPharmaciesFromDB(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Pharmacies fetched successfully',
        data: result,
    });
});



export const PharmacyControllers = {
    createPharmacy,
    getAllPharmacies
};