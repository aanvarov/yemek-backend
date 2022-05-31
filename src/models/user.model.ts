import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { CityDocument } from "./city.model";
import { RegionDocument } from "./region.model";
import { RestaurantDocument } from "./restaurant.model";

enum UserRole {
  CUSTOMER = "customer",
  DELIVER = "deliver",
  MANAGER = "manager",
  COOK = "cook",
}

export interface UserDocument extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  restaurant: RestaurantDocument["_id"];
  phone: string;
  favorites: mongoose.Types.ObjectId[];
  address: string;
  city: CityDocument["_id"];
  region: RegionDocument["_id"];
  active: boolean;
  passwordRequested: boolean;
  passwordRequestedAt: Date;
  passwordRequestExpiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema = new Schema(
  {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, default: "" },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
      default: UserRole.CUSTOMER,
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    phone: { type: String, required: true, unique: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Food" }],
    address: { type: String, default: "" },
    city: { type: Schema.Types.ObjectId, ref: "City" },
    region: { type: Schema.Types.ObjectId, ref: "Region" },
    active: { type: Boolean, default: true },
    passwordRequested: { type: Boolean, default: false },
    passwordRequestedAt: { type: Date, default: null },
    passwordRequestExpiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this as UserDocument;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // Random additional salt
  const salt = await bcrypt.genSalt(config.get("saltWorkFactor") as number);

  // Hash the password along with our new salt
  const hash = await bcrypt.hash(user.password, salt);

  // Override the cleartext password with the hashed one
  user.password = hash;
  return next();
});

// Used for logging in
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  const isMatch = await bcrypt.compare(candidatePassword, user.password);
  return isMatch;
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
