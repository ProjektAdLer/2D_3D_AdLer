import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import LevelUpModalViewModel from "./LevelUpModalViewModel";
import { useEffect } from "react";
import LevelUpModalController from "./LevelUpModalController";
import {
  badgePicturesAB,
  badgePicturesCompany,
  badgePicturesKE,
  badgePicturesSuburb,
} from "./BadgePictureLookup";
import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";

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
          src={getBadgePicture(viewModel.level, viewModel.worldTheme)}
        />
      </div>
    </StyledModal>
  );
}

function getBadgePicture(level: number, worldTheme: LearningSpaceThemeType) {
  if (worldTheme === LearningSpaceThemeType.CampusAB)
    return badgePicturesAB[level];

  if (worldTheme === LearningSpaceThemeType.CampusKE)
    return badgePicturesKE[level];

  if (worldTheme === LearningSpaceThemeType.Suburb)
    return badgePicturesSuburb[level];

  if (worldTheme === LearningSpaceThemeType.Company)
    return badgePicturesCompany[level];

  return badgePicturesKE[1];
}
