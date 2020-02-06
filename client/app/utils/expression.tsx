export const between = (str, v1, v2) => {
  return str.match(new RegExp(`${v1}(.*)${v2}`)) || str;
};
