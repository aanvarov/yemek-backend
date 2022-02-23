import mongoose, { Schema } from 'mongoose';

export interface RegionDocument extends mongoose.Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const RegionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Region = mongoose.model<RegionDocument>('Region', RegionSchema);

export default Region;
