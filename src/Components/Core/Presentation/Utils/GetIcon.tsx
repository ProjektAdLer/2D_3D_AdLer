import textIcon from "../../../../Assets/icons/Zettel_darkblue_text-icon.svg";
import h5pIcon from "../../../../Assets/icons/h5p_icon.svg";
import videoIcon from "../../../../Assets/icons/video_icon_screen_button.svg";
import imageIcon from "../../../../Assets/icons/bild_icon.svg";
import { ElementTypeStrings } from "../../Domain/Types/ElementTypes";

export const getElementIcon = (type: ElementTypeStrings) => {
  switch (type) {
    case "text":
      return <img src={textIcon} className="h-8 lg:h-12 mr-2"></img>;
    case "video":
      return <img src={videoIcon} className="h-8 lg:h-12 mr-2"></img>;
    case "image":
      return <img src={imageIcon} className="h-8 lg:h-12 mr-2"></img>;
    case "h5p":
      return <img src={h5pIcon} className="h-8 lg:h-12 mr-2"></img>;
    default:
      return <img src={h5pIcon} className="h-8 lg:h-12 mr-2"></img>;
  }
};
