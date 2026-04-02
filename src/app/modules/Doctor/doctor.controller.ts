import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { DoctorServices } from './doctor.service';

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorServices.createDoctorIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Doctor added successfully',
    data: result,
  });
});

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorServices.getAllDoctorsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Doctors fetched successfully',
    data: result,
  });
});

export const DoctorControllers = {
  createDoctor,
  getAllDoctors,
};