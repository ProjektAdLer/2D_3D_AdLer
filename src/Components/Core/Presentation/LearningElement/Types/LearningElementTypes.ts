const LearningElementTypeMap = {
  h5p: Symbol("H5P Learning Element"),
  text: Symbol("Text Learning Element"),
  picture: Symbol("Picture Learning Element"),
  video: Symbol("Video Learning Element"),
};

export type LearningElementTypes = keyof typeof LearningElementTypeMap;
