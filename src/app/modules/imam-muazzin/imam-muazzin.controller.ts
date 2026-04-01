// imam-muazzin.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';

import { ImamMuazzinService } from './imam-muazzin.service';
import { sendResponse } from '../../utils/sendResponse';

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await ImamMuazzinService.getAllImamMuazzin(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'তালিকা সফলভাবে পাওয়া গেছে।',
    data: result,
  });
});

const getSingle = catchAsync(async (req: Request, res: Response) => {
  const result = await ImamMuazzinService.getSingleImamMuazzin(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'তথ্য সফলভাবে পাওয়া গেছে।',
    data: result,
  });
});

const markAsHired = catchAsync(async (req: Request, res: Response) => {
  const result = await ImamMuazzinService.markAsHired(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
    data: result,
  });
});

const markAsAvailable = catchAsync(async (req: Request, res: Response) => {
  const result = await ImamMuazzinService.markAsAvailable(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
    data: result,
  });
});

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await ImamMuazzinService.createImamMuazzin(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'তথ্য সফলভাবে যোগ হয়েছে।',
    data: result,
  });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await ImamMuazzinService.updateImamMuazzin(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'তথ্য সফলভাবে আপডেট হয়েছে।',
    data: result,
  });
});

const remove = catchAsync(async (req: Request, res: Response) => {
  const result = await ImamMuazzinService.deleteImamMuazzin(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'তথ্য সফলভাবে মুছে ফেলা হয়েছে।',
    data: result,
  });
});

export const ImamMuazzinController = {
  getAll,
  getSingle,
  markAsHired,
  markAsAvailable,
  create,
  update,
  remove,
};