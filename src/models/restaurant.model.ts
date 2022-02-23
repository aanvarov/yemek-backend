import mongoose, { Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface RestaurantDocument extends mongoose.Document {
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
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const RestaurantSchema = new Schema(
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

RestaurantSchema.pre('save', async function (next) {
  const restaurant = this as RestaurantDocument;

  // only hash the password if it has been modified (or is new)
  if (!restaurant.isModified('password')) return next();

  // Random additional salt
  const salt = await bcrypt.genSalt(config.get('saltWorkFactor') as number);

  // Hash the password along with our new salt
  const hash = await bcrypt.hash(restaurant.password, salt);

  // Override the cleartext password with the hashed one
  restaurant.password = hash;
  return next();
});

// Used for logging in
RestaurantSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  const restaurant = this as RestaurantDocument;
  const isMatch = await bcrypt.compare(candidatePassword, restaurant.password);
  return isMatch;
};

const Restaurant = mongoose.model<RestaurantDocument>('Restaurant', RestaurantSchema);

export default Restaurant;
