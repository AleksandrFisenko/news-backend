import { User } from "src/models/users.model";
import { UserWithoutParams } from "src/types/common";

export const deleteUserParams = (user: User): UserWithoutParams => {
  const { password: _, createdAt: __, ...userWithoutParams } = user;
  return userWithoutParams;
};
