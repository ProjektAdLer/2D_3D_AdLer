export enum ErrorTypes {
  USER_NOT_IN_SPACE = "User is not in a space!",
  ELEMENT_NOT_FOUND = "Could not find element!",
  ELEMENT_NOT_UNIQUE = "Found more than one element!",
}

export type ErrorTypesStrings = keyof typeof ErrorTypes;
