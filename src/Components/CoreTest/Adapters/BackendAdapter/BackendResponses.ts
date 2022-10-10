import ElementTO from "src/Components/Core/Application/DataTransferObjects/ElementTO";
import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import WorldTO from "src/Components/Core/Application/DataTransferObjects/WorldTO";
import IDSL from "../../../Core/Adapters/BackendAdapter/Types/IDSL";

export const minimalGetWorldDataResponse: WorldTO = {
  worldName: "TestWorld",
  worldGoal: "TestGoal",
  description: "TestDescription",
  goals: "TestGoals",
  spaces: [
    {
      description: "TestDescription",
      goals: "TestGoals",
      requirements: [],
      id: 1,
      name: "TestSpace",
      requiredPoints: 0,
      elements: [
        {
          id: 1,
          name: "TestElement",
          value: 42,
          type: "text",
          description: "TestDescription",
          goals: "TestGoals",
          parentSpaceId: 1,
          parentCourseId: 1,
        },
      ],
    },
  ],
};

// expected structure of the TOs
// this needs to be updated if the TOs changes
export const expectedWorldTO: WorldTO = {
  worldName: expect.any(String),
  worldGoal: expect.any(String),
  spaces: expect.any(Array),
  description: expect.any(String),
  goals: expect.any(String),
};

export const expectedSpaceTO: SpaceTO = {
  id: expect.any(Number),
  name: expect.any(String),
  elements: expect.any(Array),
  description: expect.any(String),
  goals: expect.any(String),
  requirements: expect.any(Array),
  requiredPoints: expect.any(Number),
};

export const expectedElementTO: ElementTO = {
  id: expect.any(Number),
  name: expect.any(String),
  value: expect.any(Number),
  description: expect.any(String),
  goals: expect.any(String),
  type: expect.any(String),
  parentSpaceId: expect.any(Number),
  parentCourseId: expect.any(Number),
};

export const mockDSL: IDSL = {
  learningWorld: {
    idNumber: "ac187daa-e3a7-4dbc-820d-1f9b1a978964",
    identifier: {
      type: "name",
      value: "World_For_Evaluation",
    },
    description:
      "Eine coole Welt für die Evaluation, welche alle Lernelemente enthält die zur Verfügung stehen",
    goals:
      "Eine coole Welt für die Evaluation, welche alle Lernelemente enthält die zur Verfügung stehen",
    learningWorldContent: [1],
    learningSpaces: [
      {
        spaceId: 1,
        identifier: {
          type: "name",
          value: "Space_Number_1",
        },
        description: "Der erste und einzige Lernraum",
        goals: "Der erste und einzige Lernraum",
        learningSpaceContent: [1, 2, 3, 4],
        requiredPoints: 100,
        includedPoints: 150,
        requirements: [],
      },
    ],
    learningElements: [
      {
        id: 1,
        identifier: {
          type: "FileName",
          value: "Youtube-Link-English",
        },
        description: "Ein video zur Vortbildung",
        goals: "Bitte anschauen",
        elementCategory: "video",
        learningElementValueList: [
          {
            type: "Points",
            value: "50",
          },
        ],
        learningSpaceParentId: 1,
      },
      {
        id: 2,
        identifier: {
          type: "FileName",
          value: "Text-File-Example",
        },
        description: "Text-File-Example from the Internet",
        goals: "Text-File-Example",
        elementCategory: "text",
        learningElementValueList: [
          {
            type: "Points",
            value: "25",
          },
        ],
        learningSpaceParentId: 1,
      },
      {
        id: 3,
        identifier: {
          type: "FileName",
          value: "H5P-SchiebeSpiel",
        },
        description: "H5P-SchiebeSpiel not too easy",
        goals: "Do something here",
        elementCategory: "h5p",
        learningElementValueList: [
          {
            type: "Points",
            value: "50",
          },
        ],
        learningSpaceParentId: 1,
      },
      {
        id: 4,
        identifier: {
          type: "FileName",
          value: "Cars is cool",
        },
        description: "2 Cars",
        goals: "What colors are those cars",
        elementCategory: "image",
        learningElementValueList: [
          {
            type: "Points",
            value: "25",
          },
        ],
        learningSpaceParentId: 1,
      },
    ],
  },
};
