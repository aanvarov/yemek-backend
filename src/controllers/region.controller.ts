import { Request, Response } from 'express';
import { get } from 'lodash';
import {
  createRegion,
  findRegion,
  findRegions,
  updateRegion,
  deleteRegion,
} from '../services/region.service';

export async function createRegionHandler(req: Request, res: Response) {
  // const userId = get(req, 'user._id');
  const body = req.body;
  const region = await createRegion({ ...body });
  return res.status(201).send(region);
}

export async function updateRegionHandler(req: Request, res: Response) {
  // const userId = get(req, 'user._id');
  const regionId = get(req, 'params.regionId');
  const update = req.body;

  const region = await findRegion({ _id: regionId });

  if (!region) {
    return res.sendStatus(404);
  }
  const updatedRegion = await updateRegion({ _id: regionId }, update, { new: true });
  return res.send(updatedRegion);
}

export async function getRegionsHandler(req: Request, res: Response) {
  // const userId = get(req, 'user._id');
  const regions = await findRegions({});
  return res.send(regions);
}

export async function getRegionHandler(req: Request, res: Response) {
  const regionId = get(req, 'params.regionId');
  const region = await findRegion({ _id: regionId });
  if (!region) return res.sendStatus(404);
  return res.send(region);
}

export async function deleteRegionHandler(req: Request, res: Response) {
  // const userId = get(req, 'user._id');
  const regionId = get(req, 'params.regionId');
  const region = await findRegion({ _id: regionId });
  if (!region) return res.sendStatus(404);
  // category user id will be restaurant id
  await deleteRegion({ _id: regionId });
  return res.sendStatus(200);
}
