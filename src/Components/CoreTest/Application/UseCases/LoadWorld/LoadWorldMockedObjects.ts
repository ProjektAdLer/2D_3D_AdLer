import LearningElementTO from "../../../../Core/Application/DataTransferObjects/LearningElementTO";
import ElementEntity from "../../../../Core/Domain/Entities/ElementEntity";

const baseElement = {
  id: 4,
  name: "Test",
  value: 10,
  description: "Test",
  goals: ["Test"],
  type: "video",
};

export const h5pInput: LearningElementTO = (() => {
  baseElement.type = "h5p";
  return baseElement as LearningElementTO;
})();

export const h5pExpected: LearningElementTO = (() => {
  baseElement.type = "h5p";
  return baseElement as LearningElementTO;
})();

export const textInput: LearningElementTO = (() => {
  baseElement.type = "text";
  return baseElement as LearningElementTO;
})();

export const textExpected: LearningElementTO = (() => {
  baseElement.type = "text";
  return baseElement as LearningElementTO;
})();

export const imageInput: LearningElementTO = (() => {
  baseElement.type = "image";
  return baseElement as LearningElementTO;
})();

export const imageExpected: LearningElementTO = (() => {
  baseElement.type = "image";
  return baseElement as LearningElementTO;
})();
export const videoInput: LearningElementTO = (() => {
  baseElement.type = "video";
  return baseElement as LearningElementTO;
})();

export const videoExpected: LearningElementTO = (() => {
  baseElement.type = "h5p";
  return baseElement as LearningElementTO;
})();

export const mapElementInputAndExpected: [
  string,
  LearningElementTO,
  Partial<ElementEntity>
][] = [
  ["h5p", h5pInput, h5pExpected],
  ["text", textInput, textExpected],
  ["image", imageInput, imageExpected],
  ["video", videoInput, videoExpected],
];
