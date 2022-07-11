export const parseBool = (input: string | boolean): boolean => {
  if (typeof input === "boolean") return input;
  return input === "true";
};
