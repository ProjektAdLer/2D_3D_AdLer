import textIcon from "../../../../Assets/icons/06-text/text-icon-darkblue-nobg.svg";
import h5pIcon from "../../../../Assets/icons/05-h5p/h5p-icon-nobg.svg";
import videoIcon from "../../../../Assets/icons/07-video/video-icon-nobg.svg";
import imageIcon from "../../../../Assets/icons/04-image/image-icon.svg";
import taskIcon from "../../../../Assets/icons/03-task/task-icon-middle-nocheck-nobg.svg";
import quizIcon from "../../../../Assets/icons/36-adaptivity-quiz/adaptivity-quiz-icon-nobg.svg";
import {
  LearningElementTypeStrings,
  LearningElementTypes,
} from "../../Domain/Types/LearningElementTypes";

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
          src={taskIcon}
          alt="default-element-icon"
          className="h-8 mr-2 lg:h-12"
        ></img>
      );
  }
};
