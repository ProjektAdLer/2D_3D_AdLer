import textIcon from "../../../../Assets/icons/06-text/text-icon-darkblue-nobg.svg";
import h5pIcon from "../../../../Assets/icons/05-h5p/h5p-icon-nobg.svg";
import videoIcon from "../../../../Assets/icons/07-video/video-icon-nobg.svg";
import imageIcon from "../../../../Assets/icons/04-image/image-icon.svg";
import { ElementTypeStrings } from "../../Domain/Types/ElementTypes";

export const getElementIcon = (type: ElementTypeStrings) => {
  switch (type) {
    case "text":
      return <img src={textIcon} className="h-8 mr-2 lg:h-12"></img>;
    case "video":
      return <img src={videoIcon} className="h-8 mr-2 lg:h-12"></img>;
    case "image":
      return <img src={imageIcon} className="h-8 mr-2 lg:h-12"></img>;
    case "h5p":
      return <img src={h5pIcon} className="h-8 mr-2 lg:h-12"></img>;
    default:
      return <img src={h5pIcon} className="h-8 mr-2 lg:h-12"></img>;
  }
};
