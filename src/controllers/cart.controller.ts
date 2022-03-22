import { Request, Response } from 'express';
import { get } from 'lodash';
import { createCart, findCart, findCarts, updateCart, deleteCart } from '../services/cart.service';

export async function createCartHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const body = req.body;
  const category = await createCart({ ...body, restaurant: userId });
  return res.status(201).send(category);
}

export async function updateCartHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const cartId = get(req, 'params.cartId');
  const update = req.body;

  const cart = await findCart({ _id: cartId });

  if (!cart) {
    return res.sendStatus(404);
  }

  // category user id will be restaurant id
  if (String(cart.restaurant) !== String(userId)) {
    return res.sendStatus(401);
  }
  const updatedCart = await updateCart({ _id: cartId }, update, { new: true });

  return res.send(updatedCart);
}

export async function getCartsHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const carts = await findCarts({ restaurant: userId });
  return res.send(carts);
}

export async function getCartHandler(req: Request, res: Response) {
  const cartId = get(req, 'params.cartId');
  const cart = await findCart({ _id: cartId });
  if (!cart) return res.sendStatus(404);
  return res.send(cart);
}

export async function deleteCartHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const cartId = get(req, 'params.cartId');
  const cart = await findCart({ _id: cartId });
  if (!cart) return res.sendStatus(404);
  // category user id will be restaurant id
  if (String(cart.restaurant) !== userId) return res.sendStatus(401);
  await deleteCart({ _id: cartId });
  return res.sendStatus(200);
}
