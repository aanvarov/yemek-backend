import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import Category, { CategoryDocument } from '../models/category.model';

export async function createCategory(input: DocumentDefinition<CategoryDocument>) {
  try {
    return await Category.create(input);
  } catch (error) {
    throw new Error(error);
  }
}

export async function findCategory(
  query: FilterQuery<CategoryDocument>,
  options: QueryOptions = { lean: true },
) {
  try {
    return await Category.findOne(query, {}, options);
  } catch (error) {
    throw new Error(error);
  }
}

export async function findCategories(
  query: FilterQuery<CategoryDocument>,
  options: QueryOptions = { lean: true },
) {
  try {
    return await Category.find(query, {}, options);
  } catch (error) {
    throw new Error(error);
  }
}

export async function findAndUpdate(
  query: FilterQuery<CategoryDocument>,
  update: UpdateQuery<CategoryDocument>,
  options: QueryOptions,
) {
  try {
    return await Category.findOneAndUpdate(query, update, options);
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteCategory(query: FilterQuery<CategoryDocument>) {
  try {
    return await Category.findOneAndDelete(query);
  } catch (error) {
    throw new Error(error);
  }
}
