import cookie from "js-cookie";

export const getToken = (): string | null => {
  const token = cookie.get("token");

  return token ? token : null;
};
