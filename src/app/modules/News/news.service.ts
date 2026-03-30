import News from "./news.model";

const getAllNewsFromDB = async (query: Record<string, unknown>) => {

  const result = await News.find().sort({ createdAt: -1 });
  return result;
};

const createNewsIntoDB = async (payload: any) => {
  const result = await News.create(payload);
  return result;
};

export const NewsService = {
  getAllNewsFromDB,
  createNewsIntoDB,
};