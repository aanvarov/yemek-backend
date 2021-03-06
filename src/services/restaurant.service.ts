import Restaurant, { RestaurantDocument } from "../models/restaurant.model";
import { DocumentDefinition, FilterQuery, LeanDocument, UpdateQuery, QueryOptions } from "mongoose";
import { omit } from "lodash";

export async function createRestaurant(input: DocumentDefinition<RestaurantDocument>) {
  try {
    return await Restaurant.create(input);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateRestaurant(
  query: FilterQuery<RestaurantDocument>,
  update: UpdateQuery<RestaurantDocument>,
  options: QueryOptions = { lean: true }
) {
  return await Restaurant.findOneAndUpdate(query, update, options);
}

export async function findRestaurant(query: FilterQuery<RestaurantDocument>) {
  try {
    return await Restaurant.findOne(query).lean();
  } catch (error) {
    throw new Error(error);
  }
}

export async function findRestaurants(query: FilterQuery<RestaurantDocument>) {
  try {
    return await Restaurant.find(query).lean();
  } catch (error) {
    throw new Error(error);
  }
}

export async function validateRestaurantPassword({
  phone,
  password,
}: {
  phone: RestaurantDocument["phone"];
  password: string;
}) {
  // lean method returns a plain javascript object, not a mongoose document
  const restaurant = await Restaurant.findOne({ phone });

  if (!restaurant) return false;

  const isValid = await restaurant.comparePassword(password);

  if (!isValid) return false;

  return omit(restaurant.toJSON(), "password") as
    | Omit<RestaurantDocument, "password">
    | LeanDocument<Omit<RestaurantDocument, "password">>;
}
