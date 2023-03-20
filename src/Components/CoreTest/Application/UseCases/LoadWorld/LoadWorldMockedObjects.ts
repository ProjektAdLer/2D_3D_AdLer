import ElementTO from "../../../../Core/Application/DataTransferObjects/ElementTO";
import ElementEntity from "../../../../Core/Domain/Entities/ElementEntity";

const baseElement = {
  id: 4,
  name: "Test",
  value: 10,
  description: "Test",
  goals: ["Test"],
  type: "video",
};

export const h5pInput: ElementTO = (() => {
  baseElement.type = "h5p";
  return baseElement as ElementTO;
})();

export const h5pExpected: ElementTO = (() => {
  baseElement.type = "h5p";
  return baseElement as ElementTO;
})();

export const textInput: ElementTO = (() => {
  baseElement.type = "text";
  return baseElement as ElementTO;
})();

export const textExpected: ElementTO = (() => {
  baseElement.type = "text";
  return baseElement as ElementTO;
})();

export const imageInput: ElementTO = (() => {
  baseElement.type = "image";
  return baseElement as ElementTO;
})();

export const imageExpected: ElementTO = (() => {
  baseElement.type = "image";
  return baseElement as ElementTO;
})();
export const videoInput: ElementTO = (() => {
  baseElement.type = "video";
  return baseElement as ElementTO;
})();

export const videoExpected: ElementTO = (() => {
  baseElement.type = "h5p";
  return baseElement as ElementTO;
})();

export const mapElementInputAndExpected: [
  string,
  ElementTO,
  Partial<ElementEntity>
][] = [
  ["h5p", h5pInput, h5pExpected],
  ["text", textInput, textExpected],
  ["image", imageInput, imageExpected],
  ["video", videoInput, videoExpected],
];
