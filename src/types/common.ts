import { User } from "../models/users.model";

export type UserWithoutParams = Pick<
  User,
  "id" | "email" | "login" | "updatedAt" | "avatarUrl"
>;

export interface LoginResponce {
  token: string;
  user: UserWithoutParams;
}

export interface JwtPayload {
  sub: number;
  email: string;
}
