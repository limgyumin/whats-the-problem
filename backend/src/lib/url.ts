import config from 'src/config';

export const generateURL = (filename: string): string => {
  const { SERVER } = config.APP;
  return `${SERVER}/public/${filename}`;
};

export const sliceURL = (url: string | null | undefined) => {
  return url ? url.substring(url.lastIndexOf('/') + 1) : null;
};
