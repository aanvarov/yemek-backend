import { Request, Response } from 'express';
import { omit } from 'lodash';
import { createUser } from '../services/user.service';
import log from '../logger';

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

// userLogin: async (req, res) => {
//   const { phone, password } = req.body;
//   try {
//     const user = await User.findOne({ phone });
//     if (!user) {
//       return res.status(400).json({ success: false, error: 'No account exist with this account' });
//     }
//     if (user) {
//       const isPasswordCorreect = await bcrypt.compare(password, user.password);
//       if (isPasswordCorreect) {
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
