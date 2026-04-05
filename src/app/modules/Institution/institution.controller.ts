
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { InstitutionService } from './institution.service';
import { sendResponse } from '../../utils/sendResponse';
const getAllInstitutions = catchAsync(async (req: Request, res: Response) => {
    const result = await InstitutionService.getAllInstitutions(req.query);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'প্রতিষ্ঠান তালিকা পাওয়া গেছে।',
        data: result,
    });
});
const createInstitution = catchAsync(async (req: Request, res: Response) => {
    const result = await InstitutionService.createInstitution(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'প্রতিষ্ঠান সফলভাবে যোগ হয়েছে।',
        data: result,
    });
});


const deleteInstitution = catchAsync(async (req: Request, res: Response) => {
    const result = await InstitutionService.deleteInstitution(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'তথ্য সফলভাবে মুছে ফেলা হয়েছে।',
        data: result,
    });
});

export const InstitutionController = {
    getAllInstitutions,
    createInstitution,
    deleteInstitution,
};