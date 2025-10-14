import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import LevelUpModalViewModel from "./LevelUpModalViewModel";
import { useEffect, useRef } from "react";
import LevelUpModalController from "./LevelUpModalController";
import {
  badgePicturesAB,
  badgePicturesCompany,
  badgePicturesKE,
  badgePicturesSuburb,
} from "./BadgePictureLookup";
import { ThemeType } from "src/Components/Core/Domain/Types/ThemeTypes";

const levelUpSoundLink = require("../../../../../../Assets/Sounds/LevelUp.mp3");

export default function LevelUpModal() {
  const [viewModel, controller] = useBuilder<
    LevelUpModalViewModel,
    LevelUpModalController
  >(BUILDER_TYPES.ILevelUpModalBuilder);

  const [isOpen] = useObservable<boolean>(viewModel?.isOpen);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(levelUpSoundLink);
    audioRef.current.volume = 0.5; // TODO: Get from settings
  }, []);

  // Play sound when modal is shown with 1 second delay
  useEffect(() => {
    if (isOpen && audioRef.current) {
      setTimeout(() => {
        audioRef.current?.play();
      }, 1000);
    }
  }, [isOpen]);

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

function getBadgePicture(level: number, worldTheme: ThemeType) {
  switch (worldTheme) {
    case ThemeType.CampusAB:
      return badgePicturesAB[level];
    case ThemeType.CampusKE:
      return badgePicturesKE[level];
    case ThemeType.Suburb:
      return badgePicturesSuburb[level];
    case ThemeType.Company:
      return badgePicturesCompany[level];
    default:
      return badgePicturesKE[1];
  }
}
