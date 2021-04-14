export const getToken = (): string | null => {
  const token = localStorage.getItem("token");

  return token ? token : null;
};
