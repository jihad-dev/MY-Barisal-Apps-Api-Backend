import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { NewsService } from './news.service';

const getAllNews = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsService.getAllNewsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'News fetched successfully',
    data: result,
  });
});

const createNews = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsService.createNewsIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'News created successfully',
    data: result,
  });
});

export const NewsController = {
  getAllNews,
  createNews,
};