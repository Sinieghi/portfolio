export const timeConvertor = (collectDate) => {
  const array1 = [new Date(collectDate)];
  const localeString = array1.toLocaleString();
  return localeString;
};
