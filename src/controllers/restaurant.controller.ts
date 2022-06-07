import { Request, Response } from "express";
import { omit } from "lodash";
import { createRestaurant, findRestaurants } from "../services/restaurant.service";
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
