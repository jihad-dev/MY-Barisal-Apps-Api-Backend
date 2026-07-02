
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { HospitalService } from './hospital.service';
import { sendResponse } from '../../utils/sendResponse';
import Hospital from './hospital.model';

// const getAllHospitals = catchAsync(async (req: Request, res: Response) => {
//   const result = await HospitalService.getAllHospitals(req.query);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Hospitals fetched successfully',
//     data: result,
//   });
// });
const getAllHospitals = async (query: Record<string, unknown>) => {
  const { thana, type, searchTerm } = query;

  // ১. একটি ডাইনামিক কোয়েরি অবজেক্ট তৈরি করুন
  const queryObj: Record<string, unknown> = { isDeleted: false };

  // যদি ফ্রন্টএন্ড থেকে thana পাঠায়
  if (thana) {
    queryObj.thana = thana;
  }

  // যদি ফ্রন্টএন্ড থেকে type (government/private/clinic) পাঠায়
  if (type) {
    queryObj.type = type;
  }

  // সার্চ টার্ম থাকলে (যেমন নামের উপর সার্চ)
  if (searchTerm) {
    queryObj.name = { $regex: searchTerm, $options: 'i' };
  }

  // ২. ডাটাবেজ থেকে ফিল্টার অনুযায়ী হাসপাতালগুলো নিয়ে আসা
  const data = await Hospital.find(queryObj);

  // ৩. এই ফিল্টারে মোট কয়টি ম্যাচ করলো তা কাউন্ট করা
  const totalCount = await Hospital.countDocuments(queryObj);

  return {
    meta: {
      total: totalCount, // এটিই আপনার ফ্রন্টএন্ডে "৩টি" বা "৫টি" দেখাতে সাহায্য করবে
    },
    data,
  };
};
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