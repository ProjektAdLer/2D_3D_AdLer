import textIcon from "../../../../Assets/icons/Zettel_darkblue_text-icon.svg";
import h5pIcon from "../../../../Assets/icons/h5p_icon.svg";
import videoIcon from "../../../../Assets/icons/video_icon_screen_button.svg";
import imageIcon from "../../../../Assets/icons/bild_icon.svg";

export const getIcon = (type: string) => {
  switch (type) {
    case "text":
      return <img className="w-10" src={textIcon}></img>;
    case "video":
      return <img className="w-10" src={videoIcon}></img>;
    case "image":
      return <img className="w-10" src={imageIcon}></img>;
    case "h5p":
      return <img className="w-10" src={h5pIcon}></img>;
    default:
      return null;
  }
};
