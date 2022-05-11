export const LearningElementTypeSymbols = {
  h5p: Symbol("H5P Learning Element"),
  text: Symbol("Text Learning Element"),
  image: Symbol("Image Learning Element"),
  video: Symbol("Video Learning Element"),
};

export const getLearningElementSymbol = (type: string): symbol => {
  switch (type) {
    case "h5p":
      return LearningElementTypeSymbols.h5p;
    case "text":
      return LearningElementTypeSymbols.text;
    case "image":
      return LearningElementTypeSymbols.image;
    case "video":
      return LearningElementTypeSymbols.video;
    default:
      throw new Error("Unknown learning element type");
  }
};

//export type LearningElementType = keyof typeof LearningElementTypeSymbols;

// The LearningElementType will be checked when they come from the backend
export type LearningElementType = string;
