import cookie from "js-cookie";

export const setCookie = (name: string, value: string): string | undefined => {
  const options: cookie.CookieAttributes = {
    expires: 30,
  };

  return cookie.set(name, value, options);
};

export const getCookie = (name: string): string | undefined => {
  return cookie.get(name);
};

export const removeCookie = (name: string): void => {
  return cookie.remove(name);
};
