export enum LearningElementTypes {
  h5p = "h5p",
  text = "text",
  image = "image",
  video = "video",
}

export type LearningElementTypeStrings = keyof typeof LearningElementTypes;

// The LearningElementType will be checked when they come from the backend
export type LearningElementType = string;
