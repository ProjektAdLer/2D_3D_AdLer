import { LearningSpaceTemplateType } from "../Types/LearningSpaceTemplateType";
import ILearningSpaceTemplate from "./ILearningSpaceTemplate";

export const LearningSpaceTemplate_T: ILearningSpaceTemplate = {
  name: LearningSpaceTemplateType.T,
  cornerPoints: [
    { x: -8.4, y: 7.6 }, // A
    { x: -1.2, y: 7.6 }, // B
    { x: -1.2, y: 4.4 }, // C
    { x: 4.4, y: 4.4 }, // D
    { x: 4.4, y: -5.2 }, // E
    { x: -1.2, y: -5.2 }, // F
    { x: -1.2, y: -8.4 }, // G
    { x: -8.4, y: -8.4 }, // H
  ],
  walls: [
    { start: 0, end: 1 },
    //{ start: 2, end: 3 },
    { start: 7, end: 0 },
    //{ start: 10, end: 11 },
    //{ start: 12, end: 0 },
  ],
  elementSlots: [
    {
      // 1
      position: { x: -7.2, y: 6.4 },
      orientation: { rotation: 135 },
    },
    {
      // 2
      position: { x: -4.8, y: 6.8 },
      orientation: { rotation: 180 },
    },
    {
      // 3
      position: { x: -2.4, y: 6.4 },
      orientation: { rotation: 225 },
    },
    {
      // 4
      position: { x: -7.2, y: 1.2 },
      orientation: { rotation: 45 },
    },
    {
      // 5
      position: { x: -4.8, y: 0.8 },
      orientation: { rotation: 0 },
    },
    {
      // 6
      position: { x: 3.2, y: 3.2 },
      orientation: { rotation: 225 },
    },
    {
      // 7
      position: { x: -1.2, y: -0.4 },
      orientation: { rotation: 90 },
    },
    {
      // 8
      position: { x: 3.2, y: -4 },
      orientation: { rotation: -45 },
    },
    {
      // 9
      position: { x: -2.4, y: -7.2 },
      orientation: { rotation: -45 },
    },
    {
      // 10
      position: { x: -4.8, y: -7.6 },
      orientation: { rotation: 0 },
    },
    {
      // 11
      position: { x: -7.2, y: -7.2 },
      orientation: { rotation: 45 },
    },
    {
      // 12
      position: { x: -7.2, y: -2 },
      orientation: { rotation: 135 },
    },
    {
      // 13
      position: { x: -4.8, y: -1.6 },
      orientation: { rotation: 180 },
    },
  ],
  entryDoor: {
    position: { x: 4.4, y: -0.8 },
    orientation: { rotation: 0 },
  },
  exitDoor: {
    position: { x: -8.4, y: 4.2 },
    orientation: { rotation: 180 },
  },
  windows: [
    {
      position: { x: -8.6, y: -5.6 },
      orientation: { rotation: 180 },
    },
    {
      position: { x: -8.6, y: -3.6 },
      orientation: { rotation: 180 },
    },
  ],
  playerSpawnPoint: {
    position: { x: 4, y: -0.8 },
    orientation: { rotation: -90 },
  },
  introStoryElementIdlePoint: {
    position: { x: 1.4, y: -4.6 },
    orientation: { rotation: 0 },
  },
  introCutsceneSpawnPoint: {
    position: { x: 0, y: -0.8 },
    orientation: { rotation: 90 },
  },
  outroStoryElementIdlePoint: {
    position: { x: 1.4, y: 3.8 },
    orientation: { rotation: 60 },
  },
};
