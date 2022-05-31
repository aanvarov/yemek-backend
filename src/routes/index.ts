import { Express, Request, Response } from "express";
import authRoute from "./auth.routes";
import categoryRoute from "./category.routes";
import foodRoute from "./food.routes";
import cartRoute from "./cart.routes";
import regionRoute from "./region.routes";
import cityRoute from "./city.routes";
import orderRoute from "./order.routes";

export default (app: Express): void => {
  // Endpoints for authentication
  app.use("/api/v1/auth", authRoute);

  // Endpoints for categories
  app.use("/api/v1/categories", categoryRoute);

  // Endpoints for foods
  app.use("/api/v1/foods", foodRoute);

  // Endpoints for carts
  app.use("/api/v1/carts", cartRoute);

  // Endpoints for regions
  app.use("/api/v1/regions", regionRoute);

  // Endpoints for cities
  app.use("/api/v1/cities", cityRoute);

  // Endpoint for orders
  app.use("/api/v1/orders", orderRoute);

  // app.use('/api/v1/favorite', routes.favorite);
  // app.use('/api/v1/order', routes.order);
  // app.use('/api/v1/rating', routes.rating);
  // app.use('/api/v1/restaurant', routes.restaurant);
};
