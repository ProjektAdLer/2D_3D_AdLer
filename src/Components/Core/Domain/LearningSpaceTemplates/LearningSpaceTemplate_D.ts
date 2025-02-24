import { LearningSpaceTemplateType } from "../Types/LearningSpaceTemplateType";
import ILearningSpaceTemplate from "./ILearningSpaceTemplate";

export const LearningSpaceTemplate_D: ILearningSpaceTemplate = {
  name: LearningSpaceTemplateType.D,
  cornerPoints: [
    { x: -8.4, y: 7.6 }, // A
    { x: 1.2, y: 7.6 }, // B
    { x: 6.4, y: 2.4 }, // C
    { x: 6.4, y: -3.2 }, // D
    { x: 1.2, y: -8.4 }, // E
    { x: -8.4, y: -8.4 }, // F
  ],
  walls: [
    { start: 0, end: 1 },
    { start: 1, end: 2 },
    { start: 5, end: 0 },
  ],
  elementSlots: [
    {
      // 1
      position: { x: -7.2, y: 6.4 },
      orientation: { rotation: 135 },
    },
    {
      // 2
      position: { x: -5.2, y: 6.8 },
      orientation: { rotation: 180 },
    },
    {
      // 3
      position: { x: -2, y: 6.8 },
      orientation: { rotation: 180 },
    },
    {
      // 4
      position: { x: 0.4, y: 6.8 },
      orientation: { rotation: 180 },
    },
    {
      // 5 //schräg
      position: { x: 3, y: 4.6 },
      orientation: { rotation: 225 },
    },
    {
      // 6
      position: { x: 5.6, y: 1.6 },
      orientation: { rotation: 270 },
    },
    {
      // 7
      position: { x: 5.6, y: -2.4 },
      orientation: { rotation: 270 },
    },
    {
      // 8 //schräg
      position: { x: 3, y: -5.4 },
      orientation: { rotation: 315 },
    },
    {
      // 9
      position: { x: 0.4, y: -7.6 },
      orientation: { rotation: 0 },
    },
    {
      // 10
      position: { x: -2, y: -7.6 },
      orientation: { rotation: 0 },
    },
    {
      // 11
      position: { x: -7.2, y: -7.2 },
      orientation: { rotation: 45 },
    },
    {
      // 12
      position: { x: -7.6, y: -5.2 },
      orientation: { rotation: 90 },
    },
    {
      // 13
      position: { x: -7.6, y: -1.6 },
      orientation: { rotation: 90 },
    },
    {
      // 14
      position: { x: -7.6, y: 0.8 },
      orientation: { rotation: 90 },
    },
    {
      // 15
      position: { x: -7.6, y: 4.4 },
      orientation: { rotation: 90 },
    },
  ],
  entryDoor: {
    position: { x: -4.4, y: -8.4 }, //-5.2 Collides with Arcade Env
    orientation: { rotation: 90 },
  },
  exitDoor: {
    position: { x: 6.4, y: -0.8 },
    orientation: { rotation: 0 },
  },
  windows: [],
  playerSpawnPoint: {
    position: { x: -5.2, y: -8 },
    orientation: { rotation: 0 },
  },
  introStoryElementIdlePoint: {
    position: { x: -3.2, y: -4.4 },
    orientation: { rotation: 180 },
  },
  introCutsceneSpawnPoint: {
    position: { x: -5.2, y: -4 },
    orientation: { rotation: 180 },
  },
  outroStoryElementIdlePoint: {
    position: { x: 2.4, y: 1.6 },
    orientation: { rotation: -135 },
  },
};
