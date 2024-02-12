import { LearningSpaceTemplateType } from "../Types/LearningSpaceTemplateType";
import ILearningSpaceTemplate from "./ILearningSpaceTemplate";

export const LearningSpaceTemplate_T: ILearningSpaceTemplate = {
  name: LearningSpaceTemplateType.T,
  cornerPoints: [
    { x: 5.6, y: -7.6 }, // A
    { x: -1.6, y: -7.6 }, // B
    { x: -1.6, y: -3.6 }, // C
    { x: -6.8, y: -3.6 }, // D
    { x: -6.8, y: 3.6 }, // E
    { x: -1.6, y: 3.6 }, // F
    { x: -1.6, y: 7.6 }, // G
    { x: 5.6, y: 7.6 }, // H
    //{ x: 5.6, y: 0.8 }, // I
    //{ x: -1.6, y: 0.8 }, // J
    //{ x: -1.6, y: -0.8 }, // K
    //{ x: 5.6, y: -0.8 }, // L
  ],
  walls: [
    { start: 0, end: 1 },
    { start: 2, end: 3 },
    { start: 6, end: 7 },
    //{ start: 10, end: 11 },
    //{ start: 12, end: 0 },
  ],
  elementSlots: [
    {
      // 1
      position: { x: 4.8, y: -6.8 },
      orientation: { rotation: 90 },
    },
    {
      // 2
      position: { x: 2, y: -6.8 },
      orientation: { rotation: 90 },
    },
    {
      // 3
      position: { x: -0.8, y: -6.8 },
      orientation: { rotation: 90 },
    },
    {
      // 4
      position: { x: -0.8, y: -4.4 },
      orientation: { rotation: 180 },
    },
    {
      // 5
      position: { x: 4.8, y: -1.6 },
      orientation: { rotation: 180 },
    },
    {
      // 6
      position: { x: -6, y: -2.8 },
      orientation: { rotation: 180 },
    },
    {
      // 7
      position: { x: -2.4, y: 0 },
      orientation: { rotation: 0 },
    },
    {
      // 8
      position: { x: -6, y: 2.8 },
      orientation: { rotation: 0 },
    },
    {
      // 9
      position: { x: 4.8, y: 1.6 },
      orientation: { rotation: -90 },
    },
    {
      // 10
      position: { x: -0.8, y: 4.4 },
      orientation: { rotation: -90 },
    },
    {
      // 11
      position: { x: -0.8, y: 6.8 },
      orientation: { rotation: -90 },
    },
    {
      // 12
      position: { x: 2, y: 6.8 },
      orientation: { rotation: -90 },
    },
    {
      // 13
      position: { x: 4.8, y: 6.8 },
      orientation: { rotation: -90 },
    },
  ],
  entryDoor: {
    position: { x: -6, y: 0 },
    orientation: { rotation: 90 },
  },
  exitDoor: {
    position: { x: 2, y: -0.8 },
    orientation: { rotation: 0 },
  },
  windows: [
    {
      position: { x: 5.6, y: -4.2 },
      orientation: { rotation: 180 },
    },
    {
      position: { x: 5.6, y: 4.2 },
      orientation: { rotation: 180 },
    },
  ],
  playerSpawnPoint: {
    position: { x: -5.2, y: 0 },
    orientation: { rotation: -90 },
  },
  introStoryElementIdlePoint: {
    position: { x: 0, y: 0 },
    orientation: { rotation: 0 },
  },
  outroStoryElementIdlePoint: {
    position: { x: 1, y: 1 },
    orientation: { rotation: 0 },
  },
};
