// fire-service.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { FireServiceService } from './fire-service.service';
import { sendResponse } from '../../utils/sendResponse';

const getAllFireServices = catchAsync(async (req: Request, res: Response) => {
  const result = await FireServiceService.getAllFireServices(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'ফায়ার সার্ভিস তালিকা পাওয়া গেছে।',
    data: result,
  });
});


const createFireService = catchAsync(async (req: Request, res: Response) => {
  const result = await FireServiceService.createFireService(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'ফায়ার সার্ভিস সফলভাবে যোগ হয়েছে।',
    data: result,
  });
});



const deleteFireService = catchAsync(async (req: Request, res: Response) => {
  const result = await FireServiceService.deleteFireService(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'তথ্য সফলভাবে মুছে ফেলা হয়েছে।',
    data: result,
  });
});

export const FireServiceController = {
  getAllFireServices,
  createFireService,
  deleteFireService,
};