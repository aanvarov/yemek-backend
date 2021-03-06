import { omit } from "lodash";
import { DocumentDefinition, FilterQuery, LeanDocument } from "mongoose";
import User, { UserDocument } from "../models/user.model";

export async function createUser(input: DocumentDefinition<UserDocument>) {
  // checking if the user already exists
  const user = await User.findOne({ phone: input.phone });
  if (user) {
    throw new Error("User phone already exists");
  }
  return await User.create(input);
}

export async function updateUser(id: string, input: DocumentDefinition<UserDocument>) {
  console.log("input", input, id);
  const user = await User.findByIdAndUpdate(id, input, { new: true });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export async function findUser(query: FilterQuery<UserDocument>) {
  try {
    return await User.findOne(query).lean();
  } catch (error) {
    throw new Error(error);
  }
}

export async function validateUserPassword({
  phone,
  password,
}: {
  phone: UserDocument["phone"];
  password: string;
}) {
  // lean method returns a plain javascript object, not a mongoose document
  const user = await User.findOne({ phone });

  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password") as
    | Omit<UserDocument, "password">
    | LeanDocument<Omit<UserDocument, "password">>;
}
