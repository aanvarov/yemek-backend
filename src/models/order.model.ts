import mongoose, { Schema } from "mongoose";
import { DiscountType } from "./cart.model";
import { FoodDocument } from "./food.model";
import { UserDocument } from "./user.model";
import { CityDocument } from "./city.model";
import { RegionDocument } from "./region.model";
import { RestaurantDocument } from "./restaurant.model";

enum OrderStatus {
  CANCELLED = "cancelled",
  DELIVERED = "delivered",
  PENDING = "pending",
  READY = "ready",
}

export interface OrderDocument extends mongoose.Document {
  status: OrderStatus;
  items: FoodDocument["_id"][];
  total: number;
  tax: number;
  subtotal: number;
  discount: number;
  discountType: DiscountType;
  deliveryFee: number;
  deliveredBy: UserDocument["_id"];
  estimatedTime: Date;
  geoLocation: string;
  cancelledAt: Date;
  deliveredAt: Date;
  deliveryAddress: string;
  deliveryContact: string;
  deliveryCity: CityDocument["_id"];
  deliveryRegion: RegionDocument["_id"];
  deliveryPhone: string;
  deliveryLocation: string;
  restaurant: RestaurantDocument["_id"];
  createdAt: Date;
  updatedAt: Date;
  customer: UserDocument["_id"];
}

const OrderSchema = new Schema(
  {
    orderId: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
    items: {
      type: [{ type: Schema.Types.ObjectId, ref: "Food" }],
      required: true,
    },
    total: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    subTotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    discountType: {
      type: String,
      enum: Object.values(DiscountType),
      default: DiscountType.NUMBER,
    },
    deliveryFee: { type: Number, default: 0 },
    deliveredBy: { type: Schema.Types.ObjectId, ref: "User" },
    estimatedTime: { type: Date, default: Date.now },
    // geoLocation: { type: String, default: "" },
    cancelledAt: { type: Date, default: null },
    deliveredAt: { type: Date, default: null },
    deliveryAddress: { type: String, default: "" },
    deliveryContact: { type: String, default: "" },
    deliveryCity: { type: Schema.Types.ObjectId, ref: "City" },
    deliveryRegion: { type: Schema.Types.ObjectId, ref: "Region" },
    deliveryPhone: { type: String, default: "" },
    deliveryLocation: { type: String, default: "" },
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
    customer: { type: Schema.Types.ObjectId, ref: "User" },
    paymentType: { type: String, default: "Cash" },
    deliveryBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<OrderDocument>("Order", OrderSchema);

export default Order;
