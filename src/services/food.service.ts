import { DocumentDefinition, FilterQuery, QueryOptions, LeanDocument, UpdateQuery } from 'mongoose';
import log from '../logger';
import Food, { FoodDocument } from '../models/food.model';

export async function createFood(input: DocumentDefinition<FoodDocument>) {
  return Food.create(input);
}

export async function findFood(
  query: FilterQuery<FoodDocument>,
  options: QueryOptions = { lean: true },
) {
  return Food.findOne(query, {}, options);
}
