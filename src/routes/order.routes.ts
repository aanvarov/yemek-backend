import express from "express";
import { requiresUser, validateRequest } from "../middleware";
const router = express.Router();
import {
  createOrderHandler,
  updateOrderHandler,
  getOrdersHandler,
  getOrdersHandlerMobile,
  getOrderHandler,
  deleteOrderHandler,
} from "../controllers/order.controller";

import {
  createOrderSchema,
  updateOrderSchema,
  deleteOrderSchema,
  getOrderSchema,
} from "../schema/order.schema";

// create a order
router.post("/", requiresUser, createOrderHandler);

// get all order (, requiresUser)
router.get("/", requiresUser, getOrdersHandler);

// get all orders by user customer
router.get("/mobile", requiresUser, getOrdersHandlerMobile);

// get a order
router.get("/:orderId", requiresUser, getOrderHandler);

// update a order
router.put("/:orderId", requiresUser, updateOrderHandler);

// delete a order
router.delete("/:orderId", requiresUser, deleteOrderHandler);

export default router;
