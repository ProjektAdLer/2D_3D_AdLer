import textIcon from "../../../../Assets/icons/text.svg";
import h5pIcon from "../../../../Assets/icons/interactive-element.svg";
import videoIcon from "../../../../Assets/icons/video.svg";
import imageIcon from "../../../../Assets/icons/image.svg";
import learningElementsIcon from "../../../../Assets/icons/learning-elements.svg";
import quizIcon from "../../../../Assets/icons/adaptivity-quiz.svg";
import {
  LearningElementTypeStrings,
  LearningElementTypes,
} from "../../Domain/Types/LearningElementTypes";
import checkIcon from "../../../../Assets/icons/check-solution.svg";

export const getCheckIcon = () => {
  return (
    <img
      src={checkIcon}
      alt="check-icon"
      className="absolute h-6 translate-x-4 -translate-y-3 lg:h-9 lg:translate-x-6 lg:-translate-y-4"
    ></img>
  );
};

export const getLearningElementIcon = (type: LearningElementTypeStrings) => {
  switch (type) {
    case "pdf":
    case "text":
      return (
        <img src={textIcon} alt="text-icon" className="h-8 mr-2 lg:h-12"></img>
      );
    case "video":
      return (
        <img
          src={videoIcon}
          alt="video-icon"
          className="h-8 mr-2 lg:h-12"
        ></img>
      );
    case "image":
      return (
        // eslint-disable-next-line
        <img
          src={imageIcon}
          alt="image-icon"
          className="h-8 mr-2 lg:h-12"
        ></img>
      );
    case "h5p":
    case "primitiveH5P":
      return (
        <img src={h5pIcon} alt="h5p-icon" className="h-8 mr-2 lg:h-12"></img>
      );
    case LearningElementTypes.adaptivity:
      return (
        <img src={quizIcon} alt="quiz-icon" className="h-8 mr-2 lg:h-12"></img>
      );
    default:
      return (
        <img
          src={learningElementsIcon}
          alt="default-element-icon"
          className="h-8 mr-2 lg:h-12"
        ></img>
      );
  }
};
