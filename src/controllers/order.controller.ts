import { Request, Response } from "express";
import { get } from "lodash";
import {
  createOrder,
  findOrder,
  findOrders,
  updateOrder,
  deleteOrder,
} from "../services/order.service";
import { findUser } from "../services/user.service";
import log from "../logger";

export async function createOrderHandler(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id");
    const body = req.body;
    const mobileUser = await findUser({ _id: userId });
    const restaurantId = body.items[0].restaurant._id;
    console.log(body);
    let items = [];
    body.items.map((item) => {
      for (let i = 0; i < item.counter; i++) {
        items.push(item);
      }
    });
    const ordersCount = await findOrders({
      restaurant: restaurantId,
    });
    // console.log("ordersCount", ordersCount.length);
    let orderId = "";
    if (ordersCount.length < 10) {
      orderId = `#0000${ordersCount.length + 1}`;
    } else if (ordersCount.length < 100) {
      orderId = `#000${ordersCount.length + 1}`;
    } else {
      orderId = `#00${ordersCount.length + 1}`;
    }

    console.log(body.items[0].restaurant._id);
    const order = await createOrder({
      ...body,
      customer: userId,
      orderId,
      restaurant: restaurantId,
      items,
    });
    console.log("order", order);
    return res.status(201).send(order);
  } catch (error) {
    log.error("Error creating order");
    log.error(error);
    return res.status(409).json({ error: error.message });
  }
}

export async function updateOrderHandler(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id");
    const orderId = get(req, "params.orderId");
    const update = req.body;
    const order = await findOrder({ _id: orderId });

    if (!order) {
      return res.sendStatus(404);
    }

    // // order user id will be restaurant id
    if (String(order.customer) !== String(userId)) {
      if (String(order.restaurant) !== String(userId)) {
        return res.sendStatus(401);
      }
    }
    const updatedOrder = await updateOrder({ _id: orderId }, update, {
      new: true,
    });
    return res.send(updatedOrder);
  } catch (error) {
    log.error("Error updating order");
    log.error(error);
    return res.status(409).json({ error: error.message });
  }
}

export async function getOrdersHandler(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id");
    const orders = await findOrders({ restaurant: userId });
    return res.send(orders);
  } catch (error) {
    log.error("Error getting orders");
    log.error(error);
    return res.status(409).json({ error: error.message });
  }
}

export async function getOrdersHandlerMobile(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id");
    const orders = await findOrders({ customer: userId });
    return res.send(orders);
  } catch (error) {
    log.error("Error getting orders");
    log.error(error);
    return res.status(409).json({ error: error.message });
  }
}

export async function getOrderHandler(req: Request, res: Response) {
  const orderId = get(req, "params.orderId");
  const order = await findOrder({ _id: orderId });
  if (!order) return res.sendStatus(404);
  return res.send(order);
}

export async function deleteOrderHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const orderId = get(req, "params.orderId");
  const order = await findOrder({ _id: orderId });
  if (!order) return res.sendStatus(404);
  // order user id will be restaurant id
  if (String(order.restaurant) !== userId) return res.sendStatus(401);
  await deleteOrder({ _id: orderId });
  return res.sendStatus(200);
}
