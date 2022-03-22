import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import Cart, { CartDocument } from '../models/cart.model';

export async function createCart(input: DocumentDefinition<CartDocument>) {
  try {
    return await Cart.create(input);
  } catch (error) {
    throw new Error(error);
  }
}

export async function findCart(
  query: FilterQuery<CartDocument>,
  options: QueryOptions = { lean: true },
) {
  try {
    return await Cart.findOne(query, {}, options);
  } catch (error) {
    throw new Error(error);
  }
}

export async function findCarts(
  query: FilterQuery<CartDocument>,
  options: QueryOptions = { lean: true },
) {
  try {
    return await Cart.find(query, {}, options);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateCart(
  query: FilterQuery<CartDocument>,
  update: UpdateQuery<CartDocument>,
  options: QueryOptions,
) {
  try {
    return await Cart.findOneAndUpdate(query, update, options);
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteCart(query: FilterQuery<CartDocument>) {
  try {
    return await Cart.findOneAndDelete(query);
  } catch (error) {
    throw new Error(error);
  }
}
