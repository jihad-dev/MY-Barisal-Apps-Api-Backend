
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AmbulanceService } from './ambulance.service';
import { sendResponse } from '../../utils/sendResponse';

const getAllAmbulances = catchAsync(async (req: Request, res: Response) => {
  const result = await AmbulanceService.getAllAmbulances(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Ambulances fetched successfully',
    data: result,
  });
});
const createAmbulance = catchAsync(async (req: Request, res: Response) => {
  const result = await AmbulanceService.createAmbulance(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Ambulance created successfully',
    data: result,
  });
});
const deleteAmbulance = catchAsync(async (req: Request, res: Response) => {
  const result = await AmbulanceService.deleteAmbulance(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Ambulance deleted successfully',
    data: result,
  });
});

export const AmbulanceController = {
  getAllAmbulances,
  createAmbulance,
  deleteAmbulance,
};