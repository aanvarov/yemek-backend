import { Request, Response } from 'express';
import { get } from 'lodash';
import {
  createCategory,
  findCategory,
  findCategories,
  findAndUpdate,
  deleteCategory,
} from '../services/category.service';

export async function createCategoryHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const body = req.body;
  const category = await createCategory({ ...body, restaurant: userId });
  return res.status(201).send(category);
}

export async function updateCategoryHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const categoryId = get(req, 'params.categoryId');
  const update = req.body;

  const category = await findCategory({ _id: categoryId });

  if (!category) {
    return res.sendStatus(404);
  }

  // category user id will be restaurant id
  if (String(category.restaurant) !== String(userId)) {
    return res.sendStatus(401);
  }
  const updatedCategory = await findAndUpdate({ _id: categoryId }, update, { new: true });

  return res.send(updatedCategory);
}

export async function getCategoriesHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const categories = await findCategories({ restaurant: userId });
  return res.send(categories);
}

export async function getCategoryHandler(req: Request, res: Response) {
  const categoryId = get(req, 'params.categoryId');
  const category = await findCategory({ _id: categoryId });
  if (!category) return res.sendStatus(404);
  return res.send(category);
}

export async function deleteCategoryHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const categoryId = get(req, 'params.categoryId');
  const category = await findCategory({ _id: categoryId });
  if (!category) return res.sendStatus(404);
  // category user id will be restaurant id
  if (String(category.restaurant) !== userId) return res.sendStatus(401);
  await deleteCategory({ _id: categoryId });
  return res.sendStatus(200);
}
