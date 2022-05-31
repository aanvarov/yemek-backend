import { Request, Response } from "express";
import { get } from "lodash";
import {
  createCategory,
  findCategory,
  findCategories,
  updateCategory,
  deleteCategory,
} from "../services/category.service";
import log from "../logger";

export async function createOrderHandler(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id");
    const body = req.body;
    const category = await createCategory({ ...body, restaurant: userId });
    return res.status(201).send(category);
  } catch (error) {
    log.error("Error creating category");
    log.error(error);
    return res.status(409).json({ error: error.message });
  }
}

export async function updateOrderHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const categoryId = get(req, "params.categoryId");
  const update = req.body;

  const category = await findCategory({ _id: categoryId });

  if (!category) {
    return res.sendStatus(404);
  }

  // category user id will be restaurant id
  if (String(category.restaurant) !== String(userId)) {
    return res.sendStatus(401);
  }
  const updatedCategory = await updateCategory({ _id: categoryId }, update, {
    new: true,
  });

  return res.send(updatedCategory);
}

export async function getOrdersHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const categories = await findCategories({});
  return res.send(categories);
}

export async function getOrderHandler(req: Request, res: Response) {
  const categoryId = get(req, "params.categoryId");
  const category = await findCategory({ _id: categoryId });
  if (!category) return res.sendStatus(404);
  return res.send(category);
}

export async function deleteOrderHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const categoryId = get(req, "params.categoryId");
  const category = await findCategory({ _id: categoryId });
  if (!category) return res.sendStatus(404);
  // category user id will be restaurant id
  if (String(category.restaurant) !== userId) return res.sendStatus(401);
  await deleteCategory({ _id: categoryId });
  return res.sendStatus(200);
}
