import { User } from "src/models/users.model";

export type UserWithoutParams = Pick<
  User,
  "id" | "email" | "login" | "updatedAt" | "avatar_url"
>;

export interface LoginResponce {
  token: string;
  user: UserWithoutParams;
}

export interface JwtPayload {
  sub: number;
  email: string;
}
