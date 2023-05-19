import { LearningSpaceTemplateTypes } from "../Types/LearningSpaceTemplateTypes";
import ILearningSpaceTemplate from "./ILearningSpaceTemplate";

export const LearningSpaceTemplate_L: ILearningSpaceTemplate = {
  name: LearningSpaceTemplateTypes.L,
  cornerPoints: [
    { x: 0, y: -7.6 }, // A
    { x: -6.8, y: -7.6 }, // B
    { x: -6.8, y: 5.2 }, // C
    { x: 0, y: 5.2 }, // D
    { x: 5.6, y: 5.2 }, // E
    { x: 5.6, y: 0 }, // F
    { x: 0, y: 0 }, // G
  ],
  walls: [
    { start: 1, end: 2 },
    { start: 2, end: 3 },
    { start: 3, end: 4 },
  ],
  elementSlots: [
    {
      // 1
      position: { x: -6, y: -5.2 },
      orientation: { rotation: Math.PI / 2 },
    },
    {
      // 2
      position: { x: -6, y: -2 },
      orientation: { rotation: Math.PI / 2 },
    },

    {
      // 3
      position: { x: -6, y: 1.2 },
      orientation: { rotation: Math.PI / 2 },
    },
    {
      // 4
      position: { x: -2.4, y: 4.4 },
      orientation: { rotation: 0 },
    },
    {
      // 5
      position: { x: 0.8, y: 4.4 },
      orientation: { rotation: 0 },
    },
    {
      // 6
      position: { x: 4, y: 4.4 },
      orientation: { rotation: 0 },
    },
    {
      // 7
      position: { x: 4, y: 0.8 },
      orientation: { rotation: Math.PI },
    },
    {
      // 8
      position: { x: 0.8, y: 0.8 },
      orientation: { rotation: Math.PI },
    },
    {
      // 9
      position: { x: -0.8, y: -2 },
      orientation: { rotation: -(Math.PI / 2) },
    },
    {
      // 10
      position: { x: -0.8, y: -5.2 },
      orientation: { rotation: -(Math.PI / 2) },
    },
  ],
  entranceDoor: {
    position: { x: -3.2, y: -7.6 },
    orientation: { rotation: Math.PI },
  },
  exitDoor: {
    position: { x: 5.6, y: 2.4 },
    orientation: { rotation: -(Math.PI / 2) },
  },
  windows: [
    {
      position: { x: -6.8, y: -3.6 },
      orientation: { rotation: Math.PI / 2 },
    },
    {
      position: { x: -0.8, y: 5.2 },
      orientation: { rotation: 0 },
    },
    {
      position: { x: 2.4, y: 5.2 },
      orientation: { rotation: 0 },
    },
  ],
};
