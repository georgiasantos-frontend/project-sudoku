//faz o tratamento no array

export const getDeepCopy = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};
