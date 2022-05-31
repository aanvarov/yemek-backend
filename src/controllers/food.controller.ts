import { Request, Response } from "express";
import { get } from "lodash";
import log from "../logger";
import {
  createFood,
  findFood,
  findFoods,
  updateFood,
  deleteFood,
} from "../services/food.service";

export async function createFoodHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const body = req.body;
  const isExist = await findFood({
    name: body.name,
    category: body.category,
    restaurant: userId,
  });
  if (isExist) {
    return res.status(409).json({ error: "Food already exist" });
  }
  const food = await createFood({ ...body, restaurant: userId });
  return res.status(201).send(food);
}

export async function updateFoodHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const foodId = get(req, "params.foodId");
  const update = req.body;

  const food = await findFood({ _id: foodId });

  if (!food) return res.sendStatus(404);

  const isExist = await findFood({
    name: update.name,
    category: update.category,
    restaurant: userId,
  });

  if (isExist) {
    return res.status(409).json({ error: "Food already exist" });
  }

  // food user id will be restaurant id
  if (String(food.restaurant) !== String(userId)) {
    return res.sendStatus(401);
  }
  const updatedFood = await updateFood({ _id: foodId }, update, { new: true });

  return res.send(updatedFood);
}

export async function getFoodsHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const foods = await findFoods({ restaurant: userId });
  // log.info(foods);
  return res.send(foods);
}

export async function getFoodsHandlerMobile(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const foods = await findFoods({});
  // log.info(foods);
  return res.send(foods);
}

export async function getFoodHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const foodId = get(req, "params.foodId");
  const food = await findFood({ _id: foodId });
  if (!food) return res.sendStatus(404);
  if (String(food.restaurant) !== String(userId)) {
    return res.sendStatus(401);
  }
  return res.send(food);
}

export async function deleteFoodHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const foodId = get(req, "params.foodId");
  const food = await findFood({ _id: foodId });
  if (!food) return res.sendStatus(404);
  if (String(food.restaurant) !== String(userId)) {
    return res.sendStatus(401);
  }
  await deleteFood({ _id: foodId });
  return res.sendStatus(204);
}
