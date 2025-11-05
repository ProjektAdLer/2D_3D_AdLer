import { LearningSpaceTemplateType } from "../Types/LearningSpaceTemplateType";
import ILearningSpaceTemplate from "./ILearningSpaceTemplate";

export const LearningSpaceTemplate_R6: ILearningSpaceTemplate = {
  name: LearningSpaceTemplateType.R6,
  cornerPoints: [
    { x: 4, y: -4 }, // A
    { x: -4, y: -4 }, // B
    { x: -4, y: 4 }, // C
    { x: 4, y: 4 }, // E
  ],
  walls: [
    { start: 1, end: 2 },
    { start: 2, end: 3 },
  ],
  elementSlots: [
    {
      // 1
      position: { x: -2.8, y: -2.8 },
      orientation: { rotation: 90 },
    },
    {
      // 2
      position: { x: -2.8, y: 0 },
      orientation: { rotation: 90 },
    },
    {
      // 3
      position: { x: -2.8, y: 2.8 },
      orientation: { rotation: 135 },
    },
    {
      // 4
      position: { x: 0, y: 2.8 },
      orientation: { rotation: 180 },
    },
    {
      // 5
      position: { x: 2.8, y: 2.8 },
      orientation: { rotation: 180 },
    },
    {
      // 6
      position: { x: 2.8, y: -2.8 },
      orientation: { rotation: 315 },
    },
  ],
  entryDoor: {
    position: { x: 0, y: -4 },
    orientation: { rotation: 90 },
  },
  exitDoor: {
    position: { x: 4, y: 0 },
    orientation: { rotation: 0 },
  },
  windows: [
    {
      position: { x: -2, y: 4.15 },
      orientation: { rotation: 270 },
    },
    {
      position: { x: 2, y: 4.15 },
      orientation: { rotation: 270 },
    },
  ],
  playerSpawnPoint: {
    position: { x: 0, y: -3.2 },
    orientation: { rotation: 0 },
  },
  introStoryElementIdlePoint: {
    position: { x: 1.4, y: -3.4 },
    orientation: { rotation: 315 },
  },
  introCutsceneSpawnPoint: {
    position: { x: 0, y: 0.2 },
    orientation: { rotation: 180 },
  },
  outroStoryElementIdlePoint: {
    position: { x: 1.4, y: 3.4 },
    orientation: { rotation: 180 },
  },
  lights: [
    {
      position: { x: 0, y: 0 },
      intensity: 10.1,
    },
  ],
};
