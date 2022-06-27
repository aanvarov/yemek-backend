import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser, updateUser } from "../services/user.service";
import log from "../logger";
import { get } from "lodash";

// controllers are responsible for handling the business logic
// controllers are never going to interact directly with our database
// that is why services are used to interact with the database
// this means we can separate database logic from our business logic
export async function createUserHandler(req: Request, res: Response) {
  try {
    log.info(req.body);
    const user = await createUser(req.body);
    log.info(`User ${user.phone} created`);
    return res.status(201).send(omit(user.toJSON(), ["password"]));
  } catch (error) {
    console.log("perroo", error);
    // log.error(error);
    return res.status(409).json({ error: error.message });
  }
}

export async function updateUserHandler(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id");
    const user = await updateUser(userId, req.body);
    log.info(`User ${user.phone} updated`);
    return res.status(200).send(omit(user.toJSON(), ["password"]));
  } catch (error) {
    log.error(error);
    return res.status(409).json({ error: error.message });
  }
}
