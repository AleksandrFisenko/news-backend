import { User } from "../models/users.model";
import { UserWithoutParams } from "../types/common";

export const deleteUserParams = (user: User): UserWithoutParams => {
  const { password: _, createdAt: __, ...userWithoutParams } = user;
  return userWithoutParams;
};
