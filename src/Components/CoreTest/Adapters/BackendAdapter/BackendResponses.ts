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

// expected structure of the LearningWorldTO
// this needs to be updated if the LearningWorldTO changes
export const expectedLearningWorldTO: LearningWorldTO = {
  worldName: expect.any(String),
  worldGoal: expect.any(String),
  learningRooms: expect.arrayContaining([
    expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      learningElements: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          value: expect.any(Number),
          requirements: expect.any(Array),
          learningElementData: expect.any(Object),
        }),
      ]),
    }),
  ]),
};

export const mockDSL: IDSL = {
  learningWorld: {
    identifier: {
      type: "name",
      value: "Lernwelt Metriken",
    },
    learningWorldContent: [],
    topics: [],
    goal: "Testgoal",
    learningSpaces: [
      {
        spaceId: 1,
        learningSpaceName: "Lernraum Metriken",
        identifier: {
          type: "name",
          value: "Lernraum Metriken",
        },
        learningSpaceContent: [1, 2, 3],
        requirements: null,
      },
    ],
    learningElements: [
      {
        id: 1,
        identifier: {
          type: "FileName",
          value: "Metriken Einstiegsvideo",
        },
        elementType: "h5p",
        learningElementValue: null,
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
          value: "Metriken Schiebespiel",
        },
        elementType: "h5p",
        learningElementValue: null,
        requirements: null,
        metaData: [
          { key: "h5pContextId", value: "123" },
          { key: "h5pFileName", value: "Schiebespiel Metriken" },
        ],
      },
      {
        id: 3,
        identifier: {
          type: "FileName",
          value: "Metriken Wortsuche",
        },
        elementType: "h5p",
        learningElementValue: null,
        requirements: null,
        metaData: [
          { key: "h5pContextId", value: "123" },
          { key: "h5pFileName", value: "Wortsuche Metriken" },
        ],
      },
      {
        id: 4,
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
