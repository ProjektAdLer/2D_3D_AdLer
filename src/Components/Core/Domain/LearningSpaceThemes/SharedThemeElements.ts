import { LearningElementModelTypeEnums } from "../LearningElementModels/LearningElementModelTypes";
import { LearningElementTypes } from "../Types/LearningElementTypes";

// =============================================================================
// Shared Learning Element Models (Single Source of Truth)
// =============================================================================
// These learning element models are used across all campus themes

export const SharedCampusLearningElements = {
  [LearningElementTypes.h5p]: [
    LearningElementModelTypeEnums.H5pElementModelTypes.Blackboard2,
    LearningElementModelTypeEnums.H5pElementModelTypes.DeskPC3,
    LearningElementModelTypeEnums.H5pElementModelTypes.DrawingTable2,
    LearningElementModelTypeEnums.H5pElementModelTypes.DaylightProjector,
  ],
  [LearningElementTypes.primitiveH5P]: [
    LearningElementModelTypeEnums.H5pElementModelTypes.Blackboard2,
    LearningElementModelTypeEnums.H5pElementModelTypes.DeskPC3,
    LearningElementModelTypeEnums.H5pElementModelTypes.DrawingTable2,
    LearningElementModelTypeEnums.H5pElementModelTypes.DaylightProjector,
  ],
  [LearningElementTypes.text]: [
    LearningElementModelTypeEnums.TextElementModelTypes.LibraryShelf,
  ],
  [LearningElementTypes.image]: [
    LearningElementModelTypeEnums.ImageElementModelTypes.ScienceGeo1,
    LearningElementModelTypeEnums.ImageElementModelTypes.ScienceBio1,
    LearningElementModelTypeEnums.ImageElementModelTypes.ScienceWhiteboard,
  ],
  [LearningElementTypes.video]: [
    LearningElementModelTypeEnums.VideoElementModelTypes.MovieProjector,
  ],
  [LearningElementTypes.pdf]: [
    LearningElementModelTypeEnums.TextElementModelTypes.Bookshelf1,
  ],
  [LearningElementTypes.adaptivity]: [
    LearningElementModelTypeEnums.QuizElementModelTypes.AleRobotNPC,
  ],
  [LearningElementTypes.notAnElement]: [],
};

export const SharedCampusStoryElement =
  LearningElementModelTypeEnums.QuizElementModelTypes.DefaultCampusNPC;

export const SharedCampusStandinDecorations = [
  require("../../../../Assets/3dModels/campusTheme/d-dcomp-schooldesk-1.glb"),
  require("../../../../Assets/3dModels/campusTheme/d-dcomp-watertower-1.glb"),
];

export const SharedCampusElevatorDoors = {
  entry: require("../../../../Assets/3dModels/sharedModels/id-elevator-entry.glb"),
  exit: require("../../../../Assets/3dModels/sharedModels/id-elevator-exit.glb"),
};
