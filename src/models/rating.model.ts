import mongoose, { Schema } from 'mongoose';
import { UserDocument } from './user.model';

export interface RatingDocument extends mongoose.Document {
  rating: number;
  customer: UserDocument['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const RatingSchema = new Schema(
  {
    rating: { type: Number, default: 0 },
    customer: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

const Rating = mongoose.model<RatingDocument>('Rating', RatingSchema);

export default Rating;
