import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import levelUpGraphic from "../../../../../../../../src/Assets/graphics/level-up.png";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import LevelUpModalViewModel from "./LevelUpModalViewModel";
import { useEffect } from "react";
import LevelUpModalController from "./LevelUpModalController";

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
      <div className="flex justify-center max-h-[75vh] lg:max-h-[85vh] xl:max-h-[85vh] w-fit h-fit max-w-[99vw]">
        <img
          className="object-scale-down max-h-[75vh] max-w-[90vw]"
          alt="LearningImage!"
          src={levelUpGraphic}
        />
      </div>
    </StyledModal>
  );
}
