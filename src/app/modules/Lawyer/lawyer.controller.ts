// lawyer.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { LawyerService } from './lawyer.service';
import { sendResponse } from '../../utils/sendResponse';

const getAllLawyers = catchAsync(async (req: Request, res: Response) => {
  const result = await LawyerService.getAllLawyers(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'আইনজীবী তালিকা পাওয়া গেছে।',
    data: result,
  });
});


const createLawyer = catchAsync(async (req: Request, res: Response) => {
  const result = await LawyerService.createLawyer(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'আইনজীবী সফলভাবে যোগ হয়েছে।',
    data: result,
  });
});


const deleteLawyer = catchAsync(async (req: Request, res: Response) => {
  const result = await LawyerService.deleteLawyer(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'তথ্য সফলভাবে মুছে ফেলা হয়েছে।',
    data: result,
  });
});

export const LawyerController = {
  getAllLawyers,
  createLawyer,
  deleteLawyer,
};