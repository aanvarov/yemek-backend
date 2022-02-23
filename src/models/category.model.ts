import mongoose, { Schema } from 'mongoose';

export interface CategoryDocument extends mongoose.Document {
  name: string;
  description: string;
  restaurant: mongoose.Types.ObjectId;
  // user: UserDocument['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
  },
  {
    timestamps: true,
  },
);

const Category = mongoose.model<CategoryDocument>('Category', CategorySchema);

export default Category;
