import { Schema, model } from "mongoose";
import { IEseba } from "./e-seba.interface";

const esevaSchema = new Schema<IEseba>(
  {
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const EsebaModel = model<IEseba>("Eseba", esevaSchema);