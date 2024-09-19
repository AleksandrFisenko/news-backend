import { User } from "../models/users.model";

export type UserWithoutParams = Pick<
  User,
  "id" | "email" | "login" | "createdAt" | "avatarUrl"
>;

export interface LoginResponce {
  token: string;
  user: UserWithoutParams;
}

export interface JwtPayload {
  sub: number;
  email: string;
}

export interface UserRequest extends Request {
  user: UserWithoutParams;
}
