import mongoose, { Document, Schema } from "mongoose";

export interface GameInterface extends Document {
  title: string;
  description: string;
  price: number;
  img: string;
  developer: string;
  releaseDate: Date;
  genre: string;
  video: string; // Agregar este campo
}

const schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    developer: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    genre: { type: String, required: true },
    video: { type: String }, // Agregar este campo
  },
  { timestamps: true }
);

export const GameModel = mongoose.model<GameInterface>("game", schema);
