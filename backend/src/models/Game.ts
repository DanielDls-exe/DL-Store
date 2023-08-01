import mongoose, { Document, Schema } from "mongoose";

export interface GameInterface extends Document {
  title: string;
  description: string;
  price: number;
  img: string;
  developer: string;
  releaseDate: string;
  genre: string;
  video: string; 
}

const schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    developer: { type: String, required: true },
    releaseDate: { type: String, required: true },
    genre: { type: String, required: true },
    video: { type: String }, 
  },
  { timestamps: true }
);

export const GameModel = mongoose.model<GameInterface>("game", schema);
