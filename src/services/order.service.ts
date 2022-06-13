import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import Order, { OrderDocument } from "../models/order.model";

export async function createOrder(input: DocumentDefinition<OrderDocument>) {
  try {
    return await Order.create(input);
  } catch (error) {
    console.log("order", error);
    throw new Error(error);
  }
}

export async function findOrder(
  query: FilterQuery<OrderDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    return await Order.findOne(query, {}, options);
  } catch (error) {
    throw new Error(error);
  }
}

export async function findOrders(
  query: FilterQuery<OrderDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    return await Order.find(query, {}, options)
      .populate("customer")
      .populate("restaurant")
      .populate("items");
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateOrder(
  query: FilterQuery<OrderDocument>,
  update: UpdateQuery<OrderDocument>,
  options: QueryOptions
) {
  try {
    return await Order.findOneAndUpdate(query, update, options);
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteOrder(query: FilterQuery<OrderDocument>) {
  try {
    return await Order.findOneAndDelete(query);
  } catch (error) {
    throw new Error(error);
  }
}
