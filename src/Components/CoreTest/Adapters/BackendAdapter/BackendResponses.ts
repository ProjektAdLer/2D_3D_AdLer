import LearningElementTO from "src/Components/Core/Application/DataTransportObjects/LearningElementTO";
import LearningRoomTO from "src/Components/Core/Application/DataTransportObjects/LearningRoomTO";
import LearningWorldTO from "src/Components/Core/Application/DataTransportObjects/LearningWorldTO";
import IDSL from "../../../Core/Adapters/BackendAdapter/Types/IDSL";

export const minimalGetLearningWorldDataResponse: LearningWorldTO = {
  worldName: "TestWorld",
  worldGoal: "TestGoal",
  learningRooms: [
    {
      id: 1,
      name: "TestRoom",
      learningElements: [
        {
          id: 1,
          name: "TestElement",
          value: 42,
          requirements: undefined,
          learningElementData: {
            type: "text",
          },
        },
      ],
    },
  ],
};

// expected structure of the TOs
// this needs to be updated if the TOs changes
export const expectedLearningWorldTO: LearningWorldTO = {
  worldName: expect.any(String),
  worldGoal: expect.any(String),
  learningRooms: expect.any(Array),
};

export const expectedLearningRoomTO: LearningRoomTO = {
  id: expect.any(Number),
  name: expect.any(String),
  learningElements: expect.any(Array),
};

export const expectedLearningElementTO: LearningElementTO = {
  id: expect.any(Number),
  name: expect.any(String),
  value: expect.any(Number),
  requirements: expect.any(Array),
  learningElementData: expect.any(Object),
};

export const mockDSL: IDSL = {
  learningWorld: {
    identifier: {
      type: "name",
      value: "TestWelt",
    },
    learningWorldContent: [],
    topics: [],
    goal: "Testgoal",
    learningSpaces: [
      {
        spaceId: 1,
        learningSpaceName: "TestRaum",
        identifier: {
          type: "name",
          value: "Testraum",
        },
        learningSpaceContent: [1, 2, 3, 4],
        requirements: null,
      },
    ],
    learningElements: [
      {
        id: 1,
        identifier: {
          type: "FileName",
          value: "TestH5P",
        },
        elementType: "h5p",
        learningElementValue: {
          type: "points",
          value: 10,
        },
        requirements: null,
        metaData: [
          { key: "h5pContextId", value: "123" },
          { key: "h5pFileName", value: "Metriken Teil 1" },
        ],
      },
      {
        id: 2,
        identifier: {
          type: "FileName",
          value: "TestText",
        },
        elementType: "text",
        learningElementValue: {
          type: "points",
          value: 10,
        },
        requirements: null,
        metaData: [],
      },
      {
        id: 3,
        identifier: {
          type: "FileName",
          value: "TestImage",
        },
        elementType: "image",
        learningElementValue: null,
        requirements: null,
        metaData: [],
      },
      {
        id: 4,
        identifier: {
          type: "FileName",
          value: "TestVideo",
        },
        elementType: "video",
        learningElementValue: null,
        requirements: null,
        metaData: [],
      },
      {
        id: 5,
        identifier: {
          type: "FileName",
          value: "DSL Dokument",
        },
        elementType: "json",
        learningElementValue: null,
        requirements: null,
        metaData: [
          { key: "h5pContextId", value: "123" },
          { key: "h5pFileName", value: "bla.h5p" },
        ],
      },
    ],
  },
};
