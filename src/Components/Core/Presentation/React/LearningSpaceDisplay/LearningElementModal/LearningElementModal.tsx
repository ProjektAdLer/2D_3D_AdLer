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
import PrimitiveH5PContent from "./SubComponents/PrimitiveH5PContent";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { useTranslation } from "react-i18next";

const createModalContent = (
  viewModel: LearningElementModalViewModel,
  controller: ILearningElementModalController,
) => {
  switch (viewModel.type.Value) {
    case LearningElementTypes.h5p:
      return <H5PContent viewModel={viewModel} controller={controller} />;
    case LearningElementTypes.primitiveH5P:
      return <PrimitiveH5PContent viewModel={viewModel} />;
    case LearningElementTypes.text:
      return <TextComponent viewModel={viewModel} />;
    case LearningElementTypes.video:
      return <VideoComponent viewModel={viewModel} />;
    case LearningElementTypes.image:
      return (
        // max-h-[90vh] falls mehrere ImageComponents benutzt werden, sonst schiebts über die Fensterhöhe hinaus [DG]
        <div className="max-h[85vh]">
          <ImageComponent viewModel={viewModel} />
        </div>
      );
    case LearningElementTypes.pdf:
      return <PDFComponent viewModel={viewModel} />;
    default:
      return <div>No Element selected</div>;
  }
};

const modalStyleByTypeMap = {
  text: "h-[75vh]",
  pdf: "h-[75vh]",
  image: "max-h-[85vh]",
  video: "h-[60vh]",
  h5p: "",
  primitiveH5P: "",
};

export default function LearningElementModal({ className }: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    LearningElementModalViewModel,
    ILearningElementModalController
  >(BUILDER_TYPES.ILearningElementModalBuilder);
  const [isOpen] = useObservable<boolean>(viewModel?.isOpen);
  const [elementType] = useObservable<string>(viewModel?.type);
  const { t: translate } = useTranslation("learningElement");
  const [isVisible] = useObservable<boolean>(viewModel?.isVisible);
  const [hasScored] = useObservable<boolean>(viewModel?.hasScored);

  if (!viewModel || !controller) return null;
  if (!isOpen) return null;

  const isPrimitive =
    viewModel.type.Value === LearningElementTypes.primitiveH5P ||
    viewModel.type.Value === LearningElementTypes.text ||
    viewModel.type.Value === LearningElementTypes.video ||
    viewModel.type.Value === LearningElementTypes.image ||
    viewModel.type.Value === LearningElementTypes.pdf;

  const completionButton = () => {
    return (
      <div className="sticky bottom-0 grid mt-3 mb-2 justify-items-end">
        <StyledButton
          shape="freeFloatCenter"
          disabled={
            viewModel.type.Value === LearningElementTypes.h5p && !hasScored
          }
          animatedTransition={true}
          onClick={async () => {
            if (
              isPrimitive &&
              viewModel.type?.Value !== "h5p" &&
              viewModel.isScoreable?.Value === true
            ) {
              await controller.scoreLearningElement();
            }
            controller.closeModal();
            controller.showBottomToolTip();
          }}
        >
          {translate("submitElement")}
        </StyledButton>
      </div>
    );
  };

  return (
    <StyledModal
      title={viewModel.name.Value}
      onClose={() => {
        controller.closeModal();
        controller.showBottomToolTip();
      }}
      smallCloseButton={isPrimitive}
      hasFooter={true}
      footer={completionButton()}
      showModal={isOpen}
      className={tailwindMerge(
        className,
        "justify-center gap-2 p-2 m-3 rounded-lg",
        modalStyleByTypeMap[elementType as keyof typeof modalStyleByTypeMap],
      )}
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {createModalContent(viewModel, controller)}
    </StyledModal>
  );
}
