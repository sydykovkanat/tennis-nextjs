export const deleteEmptyQueryStrings = (params: { [key: string]: string | number }) => {
  for (const key of Object.keys(params)) {
    if (params[key] === '' || params[key] === null || params[key] === undefined) {
      delete params[key];
    }
  }
  return params;
};
