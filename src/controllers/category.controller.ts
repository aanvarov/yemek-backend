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

export async function createCategoryHandler(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id");
    const body = req.body;
    const isExist = await findCategory({
      name: body.name,
      restaurant: userId,
    });
    if (isExist) {
      return res.status(409).json({ error: "Category already exist" });
    }
    const category = await createCategory({ ...body, restaurant: userId });
    return res.status(201).send(category);
  } catch (error) {
    log.error("Error creating category");
    log.error(error);
    return res.status(409).json({ error: error.message });
  }
}

export async function updateCategoryHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const categoryId = get(req, "params.categoryId");
  const update = req.body;

  const category = await findCategory({ _id: categoryId });

  if (!category) {
    return res.sendStatus(404);
  }

  const isExist = await findCategory({
    _id: { $ne: categoryId },
    name: update.name,
    restaurant: userId,
  });
  if (isExist) {
    return res.status(409).json({ error: "Category already exist" });
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

export async function getCategoriesHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  console.log("jeeee", userId);
  const categories = await findCategories({ restaurant: userId });
  return res.send(categories);
}

export async function getCategoriesHandlerMobile(req: Request, res: Response) {
  // const userId = get(req, "user._id");
  const resId = get(req, "params.resId");
  console.log("veeeee", resId);
  // console.log("jeeee", userId);
  const categories = await findCategories({ restaurant: resId });
  // unique categories delete duclicate name
  // const uniqueCategories = categories.reduce((acc, cur) => {
  //   if (!acc.some((item) => item.name === cur.name)) {
  //     acc.push(cur);
  //   }
  //   return acc;
  // }, []);
  return res.send(categories);
}

export async function getCategoryHandler(req: Request, res: Response) {
  const categoryId = get(req, "params.categoryId");
  const category = await findCategory({ _id: categoryId });
  if (!category) return res.sendStatus(404);
  return res.send(category);
}

export async function deleteCategoryHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const categoryId = get(req, "params.categoryId");
  const category = await findCategory({ _id: categoryId });
  if (!category) return res.sendStatus(404);
  // category user id will be restaurant id
  if (String(category.restaurant) !== userId) return res.sendStatus(401);
  await deleteCategory({ _id: categoryId });
  return res.sendStatus(200);
}
