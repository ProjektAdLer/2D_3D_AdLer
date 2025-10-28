import ILearningSpaceTheme from "../ILearningSpaceTheme";
import { LearningSpaceTheme_CampusAB } from "../CampusAB/LearningSpaceTheme_CampusAB";
import {
  SharedCampusLearningElements,
  SharedCampusStoryElement,
} from "../SharedThemeElements";

export const LearningSpaceTheme_CampusKE: ILearningSpaceTheme = {
  wallTexture: LearningSpaceTheme_CampusAB.wallTexture,
  floorTexture: LearningSpaceTheme_CampusAB.floorTexture,
  learningElementModels: SharedCampusLearningElements,
  standinDecorationModels: LearningSpaceTheme_CampusAB.standinDecorationModels,
  entryDoorModel: LearningSpaceTheme_CampusAB.entryDoorModel,
  exitDoorModel: LearningSpaceTheme_CampusAB.exitDoorModel,
  windowModel: LearningSpaceTheme_CampusAB.windowModel,
  ambienceModel: require("../../../../../Assets/3dModels/campusTheme/env-campus-ke.glb"),
  storyElementModel: SharedCampusStoryElement,
  insideDecorationModels: LearningSpaceTheme_CampusAB.insideDecorationModels,
  outsideDecorationModels: LearningSpaceTheme_CampusAB.outsideDecorationModels,
};
