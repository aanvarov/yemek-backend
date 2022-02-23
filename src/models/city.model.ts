import mongoose, { Schema } from 'mongoose';

export interface CityDocument extends mongoose.Document {
  name: string;
  region: string;
  createdAt: Date;
  updatedAt: Date;
}

const CitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    region: {
      type: Schema.Types.ObjectId,
      ref: 'Region',
    },
  },
  {
    timestamps: true,
  },
);

const City = mongoose.model<CityDocument>('City', CitySchema);

export default City;
