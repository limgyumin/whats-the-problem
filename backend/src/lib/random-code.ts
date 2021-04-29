export const createRandomCode = (length: number, chars: string): string => {
  let randomCode: string = '';

  for (let i = 0; i < length; i++) {
    let random: number = Math.floor(Math.random() * chars.length);
    randomCode += chars.substring(random, random + 1);
  }

  return randomCode;
};
