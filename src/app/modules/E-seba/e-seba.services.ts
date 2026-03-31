import { IEseba } from "./e-seba.interface";
import { EsebaModel } from "./e-seba.model";

// Create
const createEseba = async (payload: IEseba) => {
  return await EsebaModel.create(payload);
};

// Get All
const getAllEseba = async (query: Record<string, unknown>) => {
  // you can later use query for filtering/pagination
  return await EsebaModel.find();
};

// Get Single
const getSingleEseba = async (id: string) => {
  return await EsebaModel.findById(id);
};

// Delete
const deleteEseba = async (id: string) => {
  return await EsebaModel.findByIdAndDelete(id);
};

export const EsebaServices = {
  createEseba,
  getAllEseba,
  getSingleEseba,
  deleteEseba,
};