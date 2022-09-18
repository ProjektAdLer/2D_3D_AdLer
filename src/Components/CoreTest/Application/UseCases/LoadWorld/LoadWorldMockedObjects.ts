import ElementTO from "src/Components/Core/Application/DataTransportObjects/ElementTO";
import ElementEntity from "src/Components/Core/Domain/Entities/ElementEntity";
import H5PElementData from "src/Components/Core/Domain/Entities/ElementData/H5PElementData";
import ImageElementData from "src/Components/Core/Domain/Entities/ElementData/ImageElementData";
import TextElementData from "src/Components/Core/Domain/Entities/ElementData/TextElementData";
import VideoElementData from "src/Components/Core/Domain/Entities/ElementData/VideoElementData";

export const h5pInput: ElementTO = {
  id: 1,
  name: "Test",
  value: 10,
  requirements: [
    {
      type: "number",
      value: 1,
    },
  ],
  elementData: {
    type: "h5p",
    contextId: 1337,
    fileName: "testFileName",
  } as H5PElementData,
};

export const h5pExpected: Partial<ElementEntity> = {
  id: 1,
  name: "Test",
  value: 10,
  requirements: [
    {
      type: "number",
      value: 1,
    },
  ],
  elementData: {
    type: "h5p",
    contextId: 1337,
    fileName: "testFileName",
  } as H5PElementData,
};

export const textInput: ElementTO = {
  id: 2,
  name: "Test",
  value: 10,
  requirements: [
    {
      type: "number",
      value: 1,
    },
  ],
  elementData: {
    type: "text",
  } as TextElementData,
};

export const textExpected: Partial<ElementEntity> = {
  id: 2,
  name: "Test",
  value: 10,
  requirements: [
    {
      type: "number",
      value: 1,
    },
  ],
  elementData: {
    type: "text",
  } as TextElementData,
};

export const imageInput: ElementTO = {
  id: 3,
  name: "Test",
  value: 10,
  requirements: [
    {
      type: "number",
      value: 1,
    },
  ],
  elementData: {
    type: "image",
  } as ImageElementData,
};

export const imageExpected: Partial<ElementEntity> = {
  id: 3,
  name: "Test",
  value: 10,
  requirements: [
    {
      type: "number",
      value: 1,
    },
  ],
  elementData: {
    type: "image",
  } as ImageElementData,
};

export const videoInput: ElementTO = {
  id: 4,
  name: "Test",
  value: 10,
  requirements: [
    {
      type: "number",
      value: 1,
    },
  ],
  elementData: {
    type: "video",
  } as VideoElementData,
};

export const videoExpected: Partial<ElementEntity> = {
  id: 4,
  name: "Test",
  value: 10,
  requirements: [
    {
      type: "number",
      value: 1,
    },
  ],
  elementData: {
    type: "video",
  } as VideoElementData,
};

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
