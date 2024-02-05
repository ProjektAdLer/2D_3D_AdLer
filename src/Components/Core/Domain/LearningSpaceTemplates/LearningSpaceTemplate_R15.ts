import { LearningSpaceTemplateType } from "../Types/LearningSpaceTemplateType";
import ILearningSpaceTemplate from "./ILearningSpaceTemplate";

export const LearningSpaceTemplate_R15: ILearningSpaceTemplate = {
  name: LearningSpaceTemplateType.R15,
  cornerPoints: [
    { x: 8.4, y: -7.6 }, // A
    { x: -1.2, y: -7.6 }, // B
    { x: -6.4, y: -2.4 }, // C
    { x: -6.4, y: 3.2 }, // D
    { x: -1.2, y: 8.4 }, // E
    { x: 8.4, y: 8.4 }, // F
  ],
  walls: [
    { start: 0, end: 1 },
    { start: 1, end: 2 },
  ],
  elementSlots: [
    {
      // 1
      position: { x: 7.6, y: -6.8 },
      orientation: { rotation: 180 },
    },
    {
      // 2
      position: { x: 5.2, y: -6.8 },
      orientation: { rotation: 180 },
    },
    {
      // 3
      position: { x: 2, y: -6.8 },
      orientation: { rotation: 180 },
    },
    {
      // 4
      position: { x: -0.4, y: -6.8 },
      orientation: { rotation: 180 },
    },
    {
      // 5 //schräg
      position: { x: -3, y: -4.6 },
      orientation: { rotation: 180 },
    },
    {
      // 6
      position: { x: -5.6, y: -1.6 },
      orientation: { rotation: 180 },
    },
    {
      // 7
      position: { x: -5.6, y: 2.4 },
      orientation: { rotation: 180 },
    },
    {
      // 8 //schräg
      position: { x: -3, y: 5.4 },
      orientation: { rotation: 180 },
    },
    {
      // 9
      position: { x: -0.4, y: 7.6 },
      orientation: { rotation: 180 },
    },
    {
      // 10
      position: { x: 2, y: 7.6 },
      orientation: { rotation: 180 },
    },
    {
      // 11
      position: { x: 7.6, y: 7.6 },
      orientation: { rotation: 180 },
    },
    {
      // 12
      position: { x: 7.6, y: 5.2 },
      orientation: { rotation: 180 },
    },
    {
      // 13
      position: { x: 7.6, y: 1.6 },
      orientation: { rotation: 180 },
    },
    {
      // 14
      position: { x: 7.6, y: -0.8 },
      orientation: { rotation: 180 },
    },
    {
      // 15
      position: { x: 7.6, y: -4.4 },
      orientation: { rotation: 180 },
    },
  ],
  entryDoor: {
    position: { x: 5.2, y: 8.4 },
    orientation: { rotation: 90 },
  },
  exitDoor: {
    position: { x: -6.4, y: 0.8 },
    orientation: { rotation: 0 },
  },
  windows: [
    {
      position: { x: 8.4, y: 3.4 },
      orientation: { rotation: 180 },
    },
    {
      position: { x: 8.4, y: -2.6 },
      orientation: { rotation: 180 },
    },
  ],
  playerSpawnPoint: {
    position: { x: 0, y: 0 },
    orientation: { rotation: 0 },
  },
  introStoryElementIdlePoint: {
    position: { x: 1, y: 1 },
    orientation: { rotation: 0 },
  },
  outroStoryElementIdlePoint: {
    position: { x: 2, y: 2 },
    orientation: { rotation: 0 },
  },
};
