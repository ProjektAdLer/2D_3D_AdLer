export const LearningElementTypeSymbols = {
  h5p: Symbol("H5P Learning Element"),
  text: Symbol("Text Learning Element"),
  image: Symbol("Image Learning Element"),
  video: Symbol("Video Learning Element"),
};

//export type LearningElementType = keyof typeof LearningElementTypeSymbols;

// The LearningElementType will be checked when they come from the backend
export type LearningElementType = string;
