import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { PoliceServices } from './police.service';

const createPolice = catchAsync(async (req: Request, res: Response) => {
  const result = await PoliceServices.createPoliceIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Police station added successfully',
    data: result,
  });
});

const getAllPolice = catchAsync(async (req: Request, res: Response) => {
  const result = await PoliceServices.getAllPoliceFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Police stations fetched successfully',
    data: result,
  });
});

export const PoliceControllers = {
  createPolice,
  getAllPolice,
};