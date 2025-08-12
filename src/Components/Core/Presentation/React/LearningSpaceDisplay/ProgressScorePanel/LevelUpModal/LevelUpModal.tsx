import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import LevelUpModalViewModel from "./LevelUpModalViewModel";
import { useEffect } from "react";
import LevelUpModalController from "./LevelUpModalController";

const badgePictures: { [key: number]: string } = {
  1: require("../../../../../../../../src/Assets/graphics/level-up.png"),
  2: require("../../../../../../../../src/Assets/graphics/level-up.png"),
  3: require("../../../../../../../../src/Assets/graphics/level-up.png"),
  4: require("../../../../../../../../src/Assets/graphics/level-up.png"),
  5: require("../../../../../../../../src/Assets/graphics/level-up.png"),
  6: require("../../../../../../../../src/Assets/graphics/level-up.png"),
  7: require("../../../../../../../../src/Assets/graphics/level-up.png"),
  8: require("../../../../../../../../src/Assets/graphics/level-up.png"),
  9: require("../../../../../../../../src/Assets/graphics/level-up.png"),
  10: require("../../../../../../../../src/Assets/graphics/level-up.png"),
};

export default function LevelUpModal() {
  const [viewModel, controller] = useBuilder<
    LevelUpModalViewModel,
    LevelUpModalController
  >(BUILDER_TYPES.ILevelUpModalBuilder);

  const [isOpen] = useObservable<boolean>(viewModel?.isOpen);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        controller?.close();
      }, viewModel?.timeToClose);
    }
  }, [isOpen, controller, viewModel?.timeToClose]);

  if (!viewModel || !controller || !isOpen) return null;

  return (
    <StyledModal showModal={isOpen} onClose={() => controller.close()}>
      <div className="flex h-fit max-h-[75vh] w-fit max-w-[99vw] justify-center lg:max-h-[85vh] xl:max-h-[85vh]">
        <img
          className="max-h-[75vh] max-w-[90vw] object-scale-down"
          alt="LearningImage!"
          src={badgePictures[viewModel.level]}
        />
      </div>
    </StyledModal>
  );
}
