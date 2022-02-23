import mongoose, { Schema } from 'mongoose';
import { FoodDocument } from './food.model';
import { UserDocument } from './user.model';
import { RestaurantDocument } from './restaurant.model';

export enum DiscountType {
  PERCENTAGE = 'percentage',
  NUMBER = 'number',
}

export interface CartItemDocument extends mongoose.Document {
  food: FoodDocument['_id'];
  quantity: number;
  total: number;
  size: string;
}

export interface CartDocument extends mongoose.Document {
  items: CartItemDocument[];
  total: number;
  coupon: string;
  discount: number;
  discountType: DiscountType;
  tax: number;
  totalWithTax: number;
  deliveryFee: number;
  customer: UserDocument['_id'];
  restaurant: RestaurantDocument['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new Schema(
  {
    items: [
      {
        food: { type: Schema.Types.ObjectId, ref: 'Food' },
        quantity: { type: Number, default: 1 },
        total: { type: Number, default: 0 },
        size: { type: String },
      },
    ],
    total: { type: Number, default: 0 },
    coupon: { type: String, default: '' },
    discount: { type: Number, default: 0 },
    discountType: { type: String, enum: Object.values(DiscountType), default: DiscountType.NUMBER },
    tax: { type: Number, default: 0 },
    totalWithTax: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    customer: { type: Schema.Types.ObjectId, ref: 'User' },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  },
  {
    timestamps: true,
  },
);

const Cart = mongoose.model<CartDocument>('Cart', CartSchema);

export default Cart;
