import { LearningSpaceTemplateType } from "../Types/LearningSpaceTemplateType";
import ILearningSpaceTemplate from "./ILearningSpaceTemplate";

export const LearningSpaceTemplate_L: ILearningSpaceTemplate = {
  name: LearningSpaceTemplateType.L,
  cornerPoints: [
    { x: 0, y: -7.6 }, // A
    { x: -6.8, y: -7.6 }, // B
    { x: -6.8, y: 5.2 }, // C
    { x: 5.6, y: 5.2 }, // E
    { x: 5.6, y: 0 }, // F
    { x: 0, y: 0 }, // G
  ],
  walls: [
    { start: 1, end: 2 },
    { start: 2, end: 3 },
  ],
  elementSlots: [
    {
      // 1
      position: { x: -6, y: -5.2 },
      orientation: { rotation: 90 },
    },
    {
      // 2
      position: { x: -6, y: -2 },
      orientation: { rotation: 90 },
    },
    {
      // 3
      position: { x: -6, y: 1.2 },
      orientation: { rotation: 90 },
    },
    {
      // 4
      position: { x: -2.4, y: 4.4 },
      orientation: { rotation: 180 },
    },
    {
      // 5
      position: { x: 0.8, y: 4.4 },
      orientation: { rotation: 180 },
    },
    {
      // 6
      position: { x: 4, y: 4.4 },
      orientation: { rotation: 180 },
    },
    {
      // 7
      position: { x: 4, y: 0.8 },
      orientation: { rotation: 0 },
    },
    {
      // 8
      position: { x: 0.8, y: 0.8 },
      orientation: { rotation: 0 },
    },
    {
      // 9
      position: { x: -0.8, y: -2 },
      orientation: { rotation: -90 },
    },
    {
      // 10
      position: { x: -0.8, y: -5.2 },
      orientation: { rotation: -90 },
    },
  ],
  entryDoor: {
    position: { x: -4, y: -7.6 },
    orientation: { rotation: 90 },
  },
  exitDoor: {
    position: { x: 5.6, y: 2 },
    orientation: { rotation: 0 },
  },
  windows: [],
  playerSpawnPoint: {
    position: { x: -3.2, y: -7.6 },
    orientation: { rotation: -90 },
  },
  introStoryElementIdlePoint: {
    position: { x: -1.2, y: -6.8 },
    orientation: { rotation: -45 },
  },
  introCutsceneSpawnPoint: {
    position: { x: -3.2, y: -4.6 },
    orientation: { rotation: 90 },
  },
  outroStoryElementIdlePoint: {
    position: { x: -0.8, y: 4.4 },
    orientation: { rotation: 180 },
  },
};
