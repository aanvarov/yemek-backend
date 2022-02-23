import mongoose, { Schema } from 'mongoose';
import { UserDocument } from './user.model';
import { FoodDocument } from './food.model';

export interface FavoritesDocument extends mongoose.Document {
  foods: FoodDocument['_id'][];
  user: UserDocument['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const FavoritesSchema = new Schema(
  {
    foods: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

const Favorites = mongoose.model<FavoritesDocument>('Favorites', FavoritesSchema);

export default Favorites;
