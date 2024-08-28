import { User } from "src/models/users.model";

export type UserWithoutParams = Pick<
  User,
  "id" | "email" | "login" | "updatedAt" | "avatar_url"
>;

export interface LoginResponce {
  token: string;
  user: UserWithoutParams;
}
