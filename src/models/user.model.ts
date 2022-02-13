import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next) {
  const user = this as UserDocument;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // Random additional salt
  const salt = await bcrypt.genSalt(config.get('saltWorkFactor') as number);

  // Hash the password along with our new salt
  const hash = await bcrypt.hash(user.password, salt);

  // Override the cleartext password with the hashed one
  user.password = hash;
  return next();
});

// Used for logging in
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as UserDocument;
  const isMatch = await bcrypt.compare(candidatePassword, user.password);
  return isMatch;
};

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
