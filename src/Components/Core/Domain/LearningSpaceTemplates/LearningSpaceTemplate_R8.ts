import { LearningSpaceTemplateType } from "../Types/LearningSpaceTemplateType";
import ILearningSpaceTemplate from "./ILearningSpaceTemplate";

export const LearningSpaceTemplate_R8: ILearningSpaceTemplate = {
  name: LearningSpaceTemplateType.R8,
  cornerPoints: [
    { x: 4.15, y: -6.15 }, // A
    { x: -4.15, y: -6.15 }, // B
    { x: -4.15, y: 6.95 }, // C
    { x: 4.15, y: 6.95 }, // D
  ],
  walls: [
    { start: 1, end: 2 },
    { start: 2, end: 3 },
  ],
  elementSlots: [
    {
      // 1
      position: { x: -2, y: -4.4 },
      orientation: { rotation: 0 },
    },
    {
      // 2
      position: { x: -2, y: -1.2 },
      orientation: { rotation: 0 },
    },
    {
      // 3
      position: { x: -2, y: 2 },
      orientation: { rotation: 0 },
    },
    {
      // 4
      position: { x: -2, y: 6 },
      orientation: { rotation: 0 },
    },
    {
      // 5
      position: { x: 2, y: 6 },
      orientation: { rotation: 0 },
    },
    {
      // 6
      position: { x: 2, y: 2 },
      orientation: { rotation: 0 },
    },
    {
      // 7
      position: { x: 2, y: -1.2 },
      orientation: { rotation: 0 },
    },
    {
      // 8
      position: { x: 2, y: -4.4 },
      orientation: { rotation: 0 },
    },
  ],
  entryDoor: {
    position: { x: 0, y: -6 },
    orientation: { rotation: -90 },
  },
  exitDoor: {
    position: { x: 4, y: 4.4 },
    orientation: { rotation: 0 },
  },
  windows: [
    {
      position: { x: -4, y: -2 },
      orientation: { rotation: 180 },
    },
    {
      position: { x: -4, y: 2 },
      orientation: { rotation: 180 },
    },
  ],
};

//Spawnpoint   position: { x: 0, y: -5.2 },
