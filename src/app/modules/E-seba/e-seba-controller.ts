import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

import { EsebaServices } from "./e-seba.services";
import { sendResponse } from "../../utils/sendResponse";

// Create E-Seba
const createEseba = catchAsync(async (req: Request, res: Response) => {
  const result = await EsebaServices.createEseba(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "E-Seba created successfully",
    data: result,
  });
});

// Get All E-Seba
const getAllEseba = catchAsync(async (req: Request, res: Response) => {
  const result = await EsebaServices.getAllEseba(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "E-Seba fetched successfully",
    data: result,
  });
});

// Get Single E-Seba
const getSingleEseba = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EsebaServices.getSingleEseba(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single E-Seba fetched successfully",
    data: result,
  });
});

// Delete E-Seba
const deleteEseba = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EsebaServices.deleteEseba(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "E-Seba deleted successfully",
    data: result,
  });
});

export const EsebaController = {
  createEseba,
  getAllEseba,
  getSingleEseba,
  deleteEseba,
};