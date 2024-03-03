import { Schema, model, Types } from "mongoose";
import { Food, FoodSchema } from "./food.model";
import { OrderStatus } from "../constants/order_status";

// we need to make interface for LatLng because we dont have leflet here so we dont have that type
export interface LatLng {
  lat: string;
  lng: string;
}

// lets create schema for this interface
export const LatLngSchema = new Schema<LatLng>({
  lat: { type: String, required: true },
  lng: { type: String, required: true },
});

// we need order item
export interface OrderItem {
  food: Food;
  price: number;
  quantity: number;
}

export const OrderItemSchema = new Schema<OrderItem>({
  food: { type: FoodSchema, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Now lets create the order. Frontend wali fields lelegy

export interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  name: string;
  address: string;
  addressLatLng: LatLng;
  paymentId: string;
  status: OrderStatus;
  // This type is typescript type
  user: Types.ObjectId; // for foreign key we dont want to save userid details we just want to put its id and us id sy you can access user
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<Order>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    addressLatLng: { type: LatLngSchema, required: true },
    paymentId: { type: String },
    totalPrice: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true }, // We defube array like this
    status: { type: String, default: OrderStatus.NEW },
    user: { type: Schema.Types.ObjectId, required: true }, // This type is schema type
  },
  {
    timestamps: true, // created updated automatically generate hujaye gy no need to put in schema when we put this
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    // id mila gy order.id instead of order._id
  }
);

export const OrderModel = model("order", orderSchema);
