import { Request, Response } from "express";
import { omit, get } from "lodash";
import {
  createRestaurant,
  findRestaurants,
  updateRestaurant,
} from "../services/restaurant.service";
import log from "../logger";

export async function createRestaurantHandler(req: Request, res: Response) {
  try {
    const restaurant = await createRestaurant(req.body);
    log.info(`Restaurant ${restaurant.email} created`);
    return res.status(201).send(omit(restaurant.toJSON(), ["password"]));
  } catch (error) {
    log.error("Error creating restaurant");
    log.error(error);
    return res.status(409).json({ error: error.message });
  }
}

export async function updateRestaurantHandler(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id");
    const resId = get(req, "params.resId");
    if (userId !== resId) {
      return res.status(403).json({ error: "You are not allowed to update this restaurant" });
    }
    const restaurant = await updateRestaurant({ _id: userId }, req.body, { new: true });
    log.info(`Restaurant ${restaurant.email} updated`);
    return res.status(200).send(omit(restaurant.toJSON(), ["password"]));
  } catch (error) {
    log.error("Error updating restaurant");
    log.error(error);
    return res.status(409).json({ error: error.message });
  }
}

export async function getRestaurantsHandlerMobile(req: Request, res: Response) {
  try {
    const restaurants = await findRestaurants({});
    return res.send(restaurants);
  } catch (error) {
    log.error("Error getting restaurants");
    log.error(error);
    return res.status(409).json({ error: error.message });
  }
}
