export enum LearningElementTypes {
  h5p = "h5p",
  text = "text",
  image = "image",
  video = "video",
  pdf = "pdf",
  adaptivity = "adaptivity",
  notAnElement = "notAnElement",
}

export type LearningElementTypeStrings = keyof typeof LearningElementTypes;
