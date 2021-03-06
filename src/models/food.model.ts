import mongoose, { Schema } from "mongoose";
import { CategoryDocument } from "./category.model";
import { RatingDocument } from "./rating.model";
import { RestaurantDocument } from "./restaurant.model";

enum Status {
  IN_STOCK = "instock",
  OUT_OF_STOCK = "outofstock",
}

export interface FoodDocument extends mongoose.Document {
  name: string;
  price: number;
  img: string;
  rating: RatingDocument["_id"][];
  description: string;
  size: string[];
  status: Status;
  category: CategoryDocument["_id"][];
  restaurant: RestaurantDocument["_id"];
  prepareTime: number;
  active: boolean;
  toppings: string[];
  ingredients: string[];
  isFeatured: boolean;
  featuredExpiresAt: Date;
  featuredStartsAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const FoodSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    rating: { type: [{ type: Schema.Types.ObjectId, ref: "Rating" }], default: [] },
    description: { type: String, required: true },
    size: { type: Schema.Types.Array, default: [] },
    status: { type: String, enum: Object.values(Status), default: Status.IN_STOCK },
    category: {
      type: [{ type: Schema.Types.ObjectId, ref: "Category" }],
      default: [],
      required: true,
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    prepareTime: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    toppings: { type: Schema.Types.Array, default: [] },
    ingredients: { type: Schema.Types.Array, default: [] },
    isFeatured: { type: Boolean, default: false },
    featuredExpiresAt: { type: Date, default: null },
    featuredStartsAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model<FoodDocument>("Food", FoodSchema);

export default Food;
