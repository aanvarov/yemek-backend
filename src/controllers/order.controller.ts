import { Request, Response } from "express";
import { get } from "lodash";
import {
  createOrder,
  findOrder,
  findOrders,
  updateOrder,
  deleteOrder,
} from "../services/order.service";
import log from "../logger";

export async function createOrderHandler(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id");
    const body = req.body;
    const category = await createOrder({ ...body, restaurant: userId });
    return res.status(201).send(category);
  } catch (error) {
    log.error("Error creating order");
    log.error(error);
    return res.status(409).json({ error: error.message });
  }
}

export async function updateOrderHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const orderId = get(req, "params.orderId");
  const update = req.body;

  const order = await findOrder({ _id: orderId });

  if (!order) {
    return res.sendStatus(404);
  }

  // category user id will be restaurant id
  if (String(order.restaurant) !== String(userId)) {
    return res.sendStatus(401);
  }
  const updatedOrder = await updateOrder({ _id: orderId }, update, {
    new: true,
  });

  return res.send(updateOrder);
}

export async function getOrdersHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const categories = await findOrders({});
  return res.send(categories);
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

let driver_Info = (data) => undefined;
let drivers_Info;

export async function socket_getDriver(io, socket) {
  driver_Info = (data) => {
    socket.emit("socket_getDriver", data);
  };
  drivers_Info = (data) => {
    socket.on("send_companyId", () => {
      findOrders({}).then((data) => socket.emit("socket_getAllOrders", data));
    });
  };
}
