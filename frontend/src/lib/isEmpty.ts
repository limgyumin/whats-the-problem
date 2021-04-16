export const isEmpty = (content: string) => {
  return content.replace(/^\s+|\s+$/g, "") === "" ? true : false;
};
