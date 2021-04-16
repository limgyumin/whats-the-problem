export const isInvalidLength = (content: string): boolean => {
  const nameRegExp: RegExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,16}$/;
  return !nameRegExp.test(content);
};
