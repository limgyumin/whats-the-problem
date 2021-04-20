import cookie from "js-cookie";
import jwt, { SignOptions } from "jsonwebtoken";
import { IGitHubUser } from "types/user.type";
import { JWT_SECRET } from "config/config.json";

export const createToken = ({ gitHubId }: IGitHubUser): string => {
  const payload = {
    gitHubId,
  };

  const options: SignOptions = {
    expiresIn: "30d",
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const getToken = (): string | null => {
  const token = cookie.get("token");

  return token || null;
};
