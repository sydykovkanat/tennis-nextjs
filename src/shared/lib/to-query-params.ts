export const toQueryParams = (obj: { page?: number | undefined }) => {
  const array = Object.entries(obj).map((data: [string, number | undefined]) => {
    const [key, value] = data;
    return `${key}=${value}`;
  });
  return `?${array.join('&')}`;
};
