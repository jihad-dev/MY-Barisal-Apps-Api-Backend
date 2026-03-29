
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { HospitalService } from './hospital.service';
import { sendResponse } from '../../utils/sendResponse';

const getAllHospitals = catchAsync(async (req: Request, res: Response) => {
  const result = await HospitalService.getAllHospitals(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Hospitals fetched successfully',
    data: result,
  });
});

const getSingleHospital = catchAsync(async (req: Request, res: Response) => {
  const result = await HospitalService.getSingleHospital(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Hospital fetched successfully',
    data: result,
  });
});

const createHospital = catchAsync(async (req: Request, res: Response) => {
  const result = await HospitalService.createHospital(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Hospital created successfully',
    data: result,
  });
});

const updateHospital = catchAsync(async (req: Request, res: Response) => {
  const result = await HospitalService.updateHospital(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Hospital updated successfully',
    data: result,
  });
});

const deleteHospital = catchAsync(async (req: Request, res: Response) => {
  const result = await HospitalService.deleteHospital(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Hospital deleted successfully',
    data: result,
  });
});

export const HospitalController = {
  getAllHospitals,
  getSingleHospital,
  createHospital,
  updateHospital,
  deleteHospital,
};