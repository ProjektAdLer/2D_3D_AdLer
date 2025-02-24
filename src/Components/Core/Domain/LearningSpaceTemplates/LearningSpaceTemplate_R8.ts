import { LearningSpaceTemplateType } from "../Types/LearningSpaceTemplateType";
import ILearningSpaceTemplate from "./ILearningSpaceTemplate";

export const LearningSpaceTemplate_R8: ILearningSpaceTemplate = {
  name: LearningSpaceTemplateType.R8,
  cornerPoints: [
    { x: 4, y: -6 }, // A
    { x: -4, y: -6 }, // B
    { x: -4, y: 6.8 }, // C
    { x: 4, y: 6.8 }, // D
  ],
  walls: [
    { start: 1, end: 2 },
    { start: 2, end: 3 },
  ],
  elementSlots: [
    {
      // 1
      position: { x: -2, y: -4.4 },
      orientation: { rotation: 180 },
    },
    {
      // 2
      position: { x: -2, y: -1.2 },
      orientation: { rotation: 180 },
    },
    {
      // 3
      position: { x: -2, y: 2 },
      orientation: { rotation: 180 },
    },
    {
      // 4
      position: { x: -2, y: 6 },
      orientation: { rotation: 180 },
    },
    {
      // 5
      position: { x: 2, y: 6 },
      orientation: { rotation: 180 },
    },
    {
      // 6
      position: { x: 2, y: 2 },
      orientation: { rotation: 180 },
    },
    {
      // 7
      position: { x: 2, y: -1.2 },
      orientation: { rotation: 180 },
    },
    {
      // 8
      position: { x: 2, y: -4.4 },
      orientation: { rotation: 180 },
    },
  ],
  entryDoor: {
    position: { x: 0, y: -6 },
    orientation: { rotation: 90 },
  },
  exitDoor: {
    position: { x: 4, y: 4 },
    orientation: { rotation: 0 },
  },
  windows: [],
  playerSpawnPoint: {
    position: { x: 0, y: -5.2 },
    orientation: { rotation: 0 },
  },
  introStoryElementIdlePoint: {
    position: { x: -0.8, y: 6 },
    orientation: { rotation: 180 },
  },
  introCutsceneSpawnPoint: {
    position: { x: 0, y: -2.2 },
    orientation: { rotation: 180 },
  },
  outroStoryElementIdlePoint: {
    position: { x: 0.8, y: 6 },
    orientation: { rotation: 180 },
  },
};
