import { LearningElementType } from "../../Babylon/LearningElement/Types/LearningElementTypes";
import H5PComponent from "./SubComponents/H5PComponent";
import ImageComponent from "./SubComponents/ImageComponent";
import VideoComponent from "./SubComponents/VideoComponent";
import TextComponent from "./SubComponents/TextComponent";
import LearningElementModalViewModel from "./LearningElementModalViewModel";
import StyledModal from "../ReactBaseComponents/StyledModal";
import useObservable from "../CustomHooks/useObservable";
import useViewModelProvider from "../../ViewModelProvider/useViewModelProvider";

const elementBuilder = (type: LearningElementType) => {
  const loremText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  switch (type) {
    case "h5p":
      return <H5PComponent h5pEntityId={"0"} />;
    case "text":
      return <TextComponent textContent={loremText} />;
    case "video":
      return <VideoComponent embedId="iik25wqIuFo?autoplay=1" />;
    case "image":
      return (
        <div className="h-100 w-100">
          <ImageComponent
            imagesrc={
              "https://cdn.discordapp.com/attachments/887582352560246804/949558830486929458/Doku_Raumaufbau.png"
            }
          />
        </div>
      );
    default:
      return <div>No Learning Element selected</div>;
  }
};

export default function LearningElementModal() {
  const [viewModels] = useViewModelProvider(LearningElementModalViewModel);
  const [isOpen, setOpen] = useObservable<boolean>(viewModels[0]?.isOpen);

  return (
    <StyledModal
      onClose={() => {
        setOpen(false);
      }}
      //title={learningElementEntity.learningElementTitle.Value}
      footer="Ich bin der Fußteil"
      showModal={isOpen}
    >
      {isOpen && elementBuilder(viewModels[0]!.type.Value)}
    </StyledModal>
  );
}
