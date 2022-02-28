import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import log from '../logger';
import Food, { FoodDocument } from '../models/food.model';

export async function createFood(input: DocumentDefinition<FoodDocument>) {
  return await Food.create(input);
}

export async function findFood(
  query: FilterQuery<FoodDocument>,
  options: QueryOptions = { lean: true },
) {
  return await Food.findOne(query, {}, options);
}

export async function findFoods(
  query: FilterQuery<FoodDocument>,
  options: QueryOptions = { lean: true },
) {
  return await Food.find(query, {}, options);
}

export async function updateFood(
  query: FilterQuery<FoodDocument>,
  update: UpdateQuery<FoodDocument>,
  options: QueryOptions = { lean: true },
) {
  return await Food.findOneAndUpdate(query, update, options);
}

export async function deleteFood(
  query: FilterQuery<FoodDocument>,
  options: QueryOptions = { lean: true },
) {
  return await Food.findOneAndDelete(query, options);
}

export async function deleteFoods(
  query: FilterQuery<FoodDocument>,
  options: QueryOptions = { lean: true },
) {
  return await Food.deleteMany(query, options);
}
