import { Schema, model } from "mongoose";

export interface Food {
  id: string; // small
  name: string;
  price: number;
  tags: string[];
  favorite: boolean;
  stars: number;
  imageUrl: string;
  origins: string[];
  cookTime: string;
}

export const FoodSchema = new Schema<Food>(
  {
    name: { type: String, required: true }, // capital
    price: { type: Number, required: true },
    tags: { type: [String] },
    favorite: { type: Boolean, default: false }, // if u dont set favourite it will be false
    stars: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    origins: { type: [String], required: true },
    cookTime: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const FoodModel = model<Food>("food", FoodSchema);
