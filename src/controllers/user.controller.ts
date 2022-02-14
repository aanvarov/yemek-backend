import { Request, Response } from 'express';
import { omit } from 'lodash';
import { createUser } from '../services/user.service';
import log from '../logger';
// controllers are responsible for handling the business logic
// controllers are never going to interact directly with our database
// that is why services are used to interact with the database
// this means we can separate database logic from our business logic
export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    log.info(`User ${user.email} created`);
    return res.status(201).send(omit(user.toJSON(), ['password']));
  } catch (error) {
    log.error(error);
    return res.status(409).send(error.message);
  }
}

export async function createUserSessionHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    log.info(`User ${user.email} created`);
    return res.status(201).send(omit(user.toJSON(), ['password']));
  } catch (error) {
    log.error(error);
    return res.status(409).send(error.message);
  }
}

// userLogin: async (req, res) => {
//   const { phone, password } = req.body;
//   try {
//     const user = await User.findOne({ phone });
//     if (!user) {
//       return res.status(400).json({ success: false, error: 'No account exist with this account' });
//     }
//     if (user) {
//       const isPasswordCorrect = await bcrypt.compare(password, user.password);
//       if (isPasswordCorrect) {
//         const token = createToken({ userId: user._id, type: 'user' });
//         res.json({ token, user, type: 'user' });
//       } else {
//         return res.status(400).json({ success: false, error: 'phone or password is incorrect' });
//       }
//     }
//   }
//   catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// },
