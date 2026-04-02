import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { BankServices } from './bank.service';

const createBank = catchAsync(async (req: Request, res: Response) => {
  const result = await BankServices.createBankIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Bank information registered successfully',
    data: result,
  });
});

const getAllBanks = catchAsync(async (req: Request, res: Response) => {
  const result = await BankServices.getAllBanksFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Banks fetched successfully',
    data: result,
  });
});

export const BankControllers = {
  createBank,
  getAllBanks,
};