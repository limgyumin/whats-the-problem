import jwt, { SignOptions } from "jsonwebtoken";
import { IGitHubUser } from "types/user/user.type";
import { JWT_SECRET } from "config/config.json";
import { getCookie } from "./cookie";

export const createToken = ({ gitHubId }: IGitHubUser): string => {
  const payload: string | object | Buffer = {
    gitHubId,
  };

  const options: SignOptions = {
    expiresIn: "30d",
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const getToken = (): string | null => {
  const token = getCookie("token");

  return token || null;
};
