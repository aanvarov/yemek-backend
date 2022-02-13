import { model, Schema, Types } from 'mongoose';

interface IRestaurant {
  name: string;
  phone: string;
  workPhone: string;
  address: string;
  email: string;
  password: string;
  active: boolean;
  paid: boolean;
  website: string;
  imgUrl: string;
  workdays: Types.Array<string>;
  openHour: string;
  closeHour: string;
  delivery: boolean;
  takeOut: boolean;
  geoLocation: string;
  passwordRequestedAt: Date;
  passwordRequested: boolean;
  passwordRequestExpiresAt: Date;
  superAdmin: boolean;
}

const RestaurantSchema = new Schema<IRestaurant>(
  {
    name: { type: String, default: '', required: true, unique: true },
    phone: { type: String, default: '', required: true, unique: true },
    workPhone: { type: String, default: '', required: true, unique: true },
    address: { type: String, default: '', required: true },
    email: { type: String, default: '', required: true, unique: true },
    password: { type: String, default: '', required: true },
    active: { type: Boolean, default: true },
    paid: { type: Boolean, default: true },
    website: { type: String, default: '' },
    imgUrl: { type: String, default: '' },
    workdays: { type: [String], required: true },
    openHour: { type: String, default: '', required: true },
    closeHour: { type: String, default: '', required: true },
    delivery: { type: Boolean, default: false },
    takeOut: { type: Boolean, default: true },
    geoLocation: { type: String, default: '', required: true },
    passwordRequested: { type: Boolean, default: false },
    passwordRequestedAt: { type: Date, default: null },
    passwordRequestExpiresAt: { type: Date, default: null },
    superAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Restaurant = model<IRestaurant>('Restaurant', RestaurantSchema);

export default Restaurant;
