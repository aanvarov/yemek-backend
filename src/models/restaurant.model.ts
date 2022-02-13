import { model, Schema } from 'mongoose';

interface IRestaurant {
  name: string;
  address: string;
  password: string;
  email: string;
  phone: string;
  description: string;
  image: string;
  rating: number;
  reviews: string[];
  menu: string[];
}

const RestaurantSchema = new Schema<IRestaurant>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model<IRestaurant>('Restaurant', RestaurantSchema);
