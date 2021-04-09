import config from 'src/config';

export const generateURL = (file): string => {
  const { SERVER } = config.APP;
  return `${SERVER}/public/${file.filename}`;
};
