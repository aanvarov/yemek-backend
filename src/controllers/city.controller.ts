import { Request, Response } from 'express';
import { get } from 'lodash';
import { createCity, findCity, findCities, updateCity, deleteCity } from '../services/city.service';

export async function createCityHandler(req: Request, res: Response) {
  // const userId = get(req, 'user._id');
  const body = req.body;
  const city = await createCity({ ...body });
  return res.status(201).send(city);
}

export async function updateCityHandler(req: Request, res: Response) {
  // const userId = get(req, 'user._id');
  const cityId = get(req, 'params.cityId');
  const update = req.body;

  const city = await findCity({ _id: cityId });

  if (!city) {
    return res.sendStatus(404);
  }
  const updatedCity = await updateCity({ _id: cityId }, update, { new: true });
  return res.send(updatedCity);
}

export async function getCitiesHandler(req: Request, res: Response) {
  // const userId = get(req, 'user._id');
  const cities = await findCities({});
  return res.send(cities);
}

export async function getCityHandler(req: Request, res: Response) {
  const cityId = get(req, 'params.cityId');
  const city = await findCity({ _id: cityId });
  if (!city) return res.sendStatus(404);
  return res.send(city);
}

export async function deleteCityHandler(req: Request, res: Response) {
  // const userId = get(req, 'user._id');
  const cityId = get(req, 'params.cityId');
  const city = await findCity({ _id: cityId });
  if (!city) return res.sendStatus(404);
  // category user id will be restaurant id
  await deleteCity({ _id: cityId });
  return res.sendStatus(200);
}
