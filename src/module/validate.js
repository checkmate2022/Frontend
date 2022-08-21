export const removeWhitespace = (text) => {
  const regex = /\s/g;
  return text.replace(regex, '');
};
