export enum ElementTypes {
  h5p = "h5p",
  text = "text",
  image = "image",
  video = "video",
}

export type ElementTypeStrings = keyof typeof ElementTypes;

// The LearningElementType will be checked when they come from the backend
export type ElementType = string;
