import ImageComponent from "./SubComponents/ImageComponent";
import VideoComponent from "./SubComponents/VideoComponent";
import TextComponent from "./SubComponents/TextComponent";
import ElementModalViewModel from "./ElementModalViewModel";
import StyledModal from "../../ReactRelated/ReactBaseComponents/StyledModal";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import H5PContent from "./SubComponents/H5PContent";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import IElementModalController from "./IElementModalController";
import { ElementTypes } from "src/Components/Core/Domain/Types/ElementTypes";
import PDFComponent from "./SubComponents/PDFComponent";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";

const createModalContent = (
  viewModel: ElementModalViewModel,
  controller: IElementModalController
) => {
  switch (viewModel.type.Value) {
    case ElementTypes.h5p:
      return <H5PContent viewModel={viewModel} controller={controller} />;
    case ElementTypes.text:
      return <TextComponent viewModel={viewModel} />;
    case ElementTypes.video:
      return <VideoComponent viewModel={viewModel} />;
    case ElementTypes.image:
      return (
        // max-h-[90vh] falls mehrere ImageComponents benutzt werden, sonst schiebts über die Fensterhöhe hinaus [DG]
        <div className="max-h[90vh]">
          <ImageComponent viewModel={viewModel} />
        </div>
      );
    case ElementTypes.pdf:
      return <PDFComponent viewModel={viewModel} />;
    default:
      return <div>No Element selected</div>;
  }
};

export default function ElementModal({ className }: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    ElementModalViewModel,
    IElementModalController
  >(BUILDER_TYPES.IElementModalBuilder);
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
          controller.scoreElement();
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
