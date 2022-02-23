import mongoose, { Schema } from 'mongoose';

const RegionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Region = mongoose.model('Region', RegionSchema);

export default Region;
