import { Express, Request, Response } from 'express';
import authRoute from './auth.routes';
import categoryRoute from './category.routes';

export default (app: Express): void => {
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!, This is Yemek API');
  });
  // Endpoints for authentication
  app.use('/api/v1/auth', authRoute);

  // Endpoints for categories
  app.use('/api/v1/categories', categoryRoute);

  // app.use('/api/v1', routes.users);
  // app.use('/api/v1/carts', routes.carts);
  // app.use('/api/v1/category', routes.category);
  // app.use('/api/v1/city', routes.city);
  // app.use('/api/v1/favorite', routes.favorite);
  // app.use('/api/v1/food', routes.food);
  // app.use('/api/v1/order', routes.order);
  // app.use('/api/v1/rating', routes.rating);
  // app.use('/api/v1/region', routes.region);
  // app.use('/api/v1/restaurant', routes.restaurant);
};
