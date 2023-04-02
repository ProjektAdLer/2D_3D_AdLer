import ImageComponent from "./SubComponents/ImageComponent";
import VideoComponent from "./SubComponents/VideoComponent";
import TextComponent from "./SubComponents/TextComponent";
import LearningElementModalViewModel from "./LearningElementModalViewModel";
import StyledModal from "../../ReactRelated/ReactBaseComponents/StyledModal";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import H5PContent from "./SubComponents/H5PContent";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import ILearningElementModalController from "./ILearningElementModalController";
import { LearningElementTypes } from "src/Components/Core/Domain/Types/LearningElementTypes";
import PDFComponent from "./SubComponents/PDFComponent";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";

const createModalContent = (
  viewModel: LearningElementModalViewModel,
  controller: ILearningElementModalController
) => {
  switch (viewModel.type.Value) {
    case LearningElementTypes.h5p:
      return <H5PContent viewModel={viewModel} controller={controller} />;
    case LearningElementTypes.text:
      return <TextComponent viewModel={viewModel} />;
    case LearningElementTypes.video:
      return <VideoComponent viewModel={viewModel} />;
    case LearningElementTypes.image:
      return (
        // max-h-[90vh] falls mehrere ImageComponents benutzt werden, sonst schiebts über die Fensterhöhe hinaus [DG]
        <div className="max-h[90vh]">
          <ImageComponent viewModel={viewModel} />
        </div>
      );
    case LearningElementTypes.pdf:
      return <PDFComponent viewModel={viewModel} />;
    default:
      return <div>No Element selected</div>;
  }
};

export default function LearningElementModal({ className }: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    LearningElementModalViewModel,
    ILearningElementModalController
  >(BUILDER_TYPES.ILearningElementModalBuilder);
  const [isOpen, setOpen] = useObservable<boolean>(viewModel?.isOpen);

  if (!viewModel || !controller) return null;
  if (!isOpen) return null;

  const modalConfig = {
    text: "h-[80vh]",
    image: "max-h-[90vh]",
    video: "",
    h5p: "",
  };

  const modalType = viewModel.type.Value as "text" | "image" | "video" | "h5p";

  return (
    <StyledModal
      title={viewModel.name.Value}
      onClose={() => {
        setOpen(false);
        if (viewModel.type?.Value !== "h5p") {
          controller.scoreLearningElement();
        }
      }}
      showModal={isOpen}
      className={tailwindMerge(
        className,
        "flex flex-col justify-center gap-2 p-2 m-3 rounded-lg",
        modalConfig[modalType]
      )}
    >
      {createModalContent(viewModel, controller)}
    </StyledModal>
  );
}
