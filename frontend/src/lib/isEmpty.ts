export const isEmpty = (content: string | undefined): boolean => {
  if (!content) {
    return true;
  }
  return content.replace(/^\s+|\s+$/g, "") === "";
};
