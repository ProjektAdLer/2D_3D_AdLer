import LearningElementTO from "src/Components/Core/Application/DataTransportObjects/LearningElementTO";
import LearningElementEntity from "src/Components/Core/Domain/Entities/LearningElementEntity";
import H5PLearningElementData from "src/Components/Core/Domain/Entities/SpecificLearningElements/H5PLearningElementData";
import ImageLearningElementData from "src/Components/Core/Domain/Entities/SpecificLearningElements/ImageLearningElementData";
import TextLearningElementData from "src/Components/Core/Domain/Entities/SpecificLearningElements/TextLearningElementData";
import VideoLearningElementData from "src/Components/Core/Domain/Entities/SpecificLearningElements/VideoLearningElementData";

export const h5pInput: LearningElementTO = {
  id: 1,
  name: "Test",
  value: 10,
  requirements: [
    {
      type: "number",
      value: 1,
    },
  ],
  learningElementData: {
    type: "h5p",
    contextId: 1337,
    fileName: "testFileName",
  } as H5PLearningElementData,
};

export const h5pExpected: Partial<LearningElementEntity> = {
  id: 1,
  name: "Test",
  value: 10,
  requirements: [
    {
      type: "number",
      value: 1,
    },
  ],
  learningElementData: {
    type: "h5p",
    contextId: 1337,
    fileName: "testFileName",
  } as H5PLearningElementData,
};

export const textInput: LearningElementTO = {
  id: 2,
  name: "Test",
  value: 10,
  requirements: [
    {
      type: "number",
      value: 1,
    },
  ],
  learningElementData: {
    type: "text",
  } as TextLearningElementData,
};

export const textExpected: Partial<LearningElementEntity> = {
  id: 2,
  name: "Test",
  value: 10,
  requirements: [
    {
      type: "number",
      value: 1,
    },
  ],
  learningElementData: {
    type: "text",
  } as TextLearningElementData,
};

export const imageInput: LearningElementTO = {
  id: 3,
  name: "Test",
  value: 10,
  requirements: [
    {
      type: "number",
      value: 1,
    },
  ],
  learningElementData: {
    type: "image",
  } as ImageLearningElementData,
};

export const imageExpected: Partial<LearningElementEntity> = {
  id: 3,
  name: "Test",
  value: 10,
  requirements: [
    {
      type: "number",
      value: 1,
    },
  ],
  learningElementData: {
    type: "image",
  } as ImageLearningElementData,
};

export const videoInput: LearningElementTO = {
  id: 4,
  name: "Test",
  value: 10,
  requirements: [
    {
      type: "number",
      value: 1,
    },
  ],
  learningElementData: {
    type: "video",
  } as VideoLearningElementData,
};

export const videoExpected: Partial<LearningElementEntity> = {
  id: 4,
  name: "Test",
  value: 10,
  requirements: [
    {
      type: "number",
      value: 1,
    },
  ],
  learningElementData: {
    type: "video",
  } as VideoLearningElementData,
};

export const mapLearningElementInputAndExpected: [
  string,
  LearningElementTO,
  Partial<LearningElementEntity>
][] = [
  ["h5p", h5pInput, h5pExpected],
  ["text", textInput, textExpected],
  ["image", imageInput, imageExpected],
  ["video", videoInput, videoExpected],
];
