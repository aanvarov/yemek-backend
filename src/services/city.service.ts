import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import City, { CityDocument } from '../models/city.model';

export async function createCity(input: DocumentDefinition<CityDocument>) {
  try {
    return await City.create(input);
  } catch (error) {
    throw new Error(error);
  }
}

export async function findCity(
  query: FilterQuery<CityDocument>,
  options: QueryOptions = { lean: true },
) {
  try {
    return await City.findOne(query, {}, options);
  } catch (error) {
    throw new Error(error);
  }
}

export async function findCities(
  query: FilterQuery<CityDocument>,
  options: QueryOptions = { lean: true },
) {
  try {
    return await City.find(query, {}, options);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateCity(
  query: FilterQuery<CityDocument>,
  update: UpdateQuery<CityDocument>,
  options: QueryOptions,
) {
  try {
    return await City.findOneAndUpdate(query, update, options);
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteCity(query: FilterQuery<CityDocument>) {
  try {
    return await City.findOneAndDelete(query);
  } catch (error) {
    throw new Error(error);
  }
}
