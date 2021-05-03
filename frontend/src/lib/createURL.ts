export const createURL = (id: string, title: string): string => {
  const newTitle = title
    .replace(/^\s+|\s+$/g, "")
    .replace(/[{}[\]/?.,;:)*~`!^_+<>@#$%&=('"]/gi, "")
    .replaceAll(" ", "-");
  const url = `@${id}/${newTitle}`;

  return url;
};
