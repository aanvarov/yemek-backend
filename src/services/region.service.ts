import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import Region, { RegionDocument } from '../models/region.model';

export async function createRegion(input: DocumentDefinition<RegionDocument>) {
  try {
    return await Region.create(input);
  } catch (error) {
    throw new Error(error);
  }
}

export async function findRegion(
  query: FilterQuery<RegionDocument>,
  options: QueryOptions = { lean: true },
) {
  try {
    return await Region.findOne(query, {}, options);
  } catch (error) {
    throw new Error(error);
  }
}

export async function findRegions(
  query: FilterQuery<RegionDocument>,
  options: QueryOptions = { lean: true },
) {
  try {
    return await Region.find(query, {}, options);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateRegion(
  query: FilterQuery<RegionDocument>,
  update: UpdateQuery<RegionDocument>,
  options: QueryOptions,
) {
  try {
    return await Region.findOneAndUpdate(query, update, options);
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteRegion(query: FilterQuery<RegionDocument>) {
  try {
    return await Region.findOneAndDelete(query);
  } catch (error) {
    throw new Error(error);
  }
}
