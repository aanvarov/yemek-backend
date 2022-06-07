import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import log from "../logger";
import Food, { FoodDocument } from "../models/food.model";

export async function createFood(input: DocumentDefinition<FoodDocument>) {
  try {
    return await Food.create(input);
  } catch (error) {
    throw new Error(error);
  }
}

export async function findFood(
  query: FilterQuery<FoodDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    return await Food.findOne(query, {}, options);
  } catch (error) {
    throw new Error(error);
  }
}

export async function findFoods(
  query: FilterQuery<FoodDocument>,
  options: QueryOptions = { lean: true }
) {
  return await Food.find(query, {}, options).populate("restaurant").populate("category");
}

export async function updateFood(
  query: FilterQuery<FoodDocument>,
  update: UpdateQuery<FoodDocument>,
  options: QueryOptions = { lean: true }
) {
  return await Food.findOneAndUpdate(query, update, options);
}

export async function deleteFood(
  query: FilterQuery<FoodDocument>,
  options: QueryOptions = { lean: true }
) {
  return await Food.findOneAndDelete(query, options);
}

export async function deleteFoods(
  query: FilterQuery<FoodDocument>,
  options: QueryOptions = { lean: true }
) {
  return await Food.deleteMany(query, options);
}
