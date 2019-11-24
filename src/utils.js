export const message = text => {
  return `@data-provider/connector-react: ${text}`;
};

export const logError = text => {
  console.error(message(text));
};

export const warn = text => {
  console.warn(message(text));
};
