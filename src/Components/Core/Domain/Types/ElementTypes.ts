export enum ElementTypes {
  h5p = "h5p",
  text = "text",
  image = "image",
  video = "video",
  pdf = "pdf",
}

export type ElementTypeStrings = keyof typeof ElementTypes;
