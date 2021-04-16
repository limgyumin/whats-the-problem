import { useLocation } from "react-router";

const useQueryString = (target: string): string => {
  const params = new URLSearchParams(useLocation().search);

  return params.get(target) as string;
};

export default useQueryString;
