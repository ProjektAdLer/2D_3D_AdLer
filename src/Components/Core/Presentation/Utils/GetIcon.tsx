import textIcon from "../../../../Assets/icons/Zettel_darkblue_text-icon.svg";
import h5pIcon from "../../../../Assets/icons/h5p_icon.svg";
import videoIcon from "../../../../Assets/icons/video_icon_screen_button.svg";
import imageIcon from "../../../../Assets/icons/bild_icon.svg";
import { ElementTypeStrings } from "../../Domain/Types/ElementTypes";

export const getElementIcon = (type: ElementTypeStrings) => {
  switch (type) {
    case "text":
      return <img src={textIcon}></img>;
    case "video":
      return <img src={videoIcon}></img>;
    case "image":
      return <img src={imageIcon}></img>;
    case "h5p":
      return <img src={h5pIcon}></img>;
    default:
      return <img src={h5pIcon}></img>;
  }
};
