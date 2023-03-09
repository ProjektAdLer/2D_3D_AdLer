import ElementTO from "../../../Core/Application/DataTransferObjects/ElementTO";
import IDSL from "../../../Core/Adapters/BackendAdapter/Types/IDSL";
import BackendSpaceTO from "src/Components/Core/Application/DataTransferObjects/BackendSpaceTO";
import BackendWorldTO from "src/Components/Core/Application/DataTransferObjects/BackendWorldTO";

export const minimalGetWorldDataResponse: BackendWorldTO = {
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
      requiredScore: 0,
      elements: [
        {
          id: 1,
          name: "TestElement",
          value: 42,
          type: "text",
          description: "TestDescription",
          goals: "TestGoals",
          parentSpaceID: 1,
          parentWorldID: 1,
          hasScored: false,
        },
      ],
    },
  ],
};

// expected structure of the TOs
// this needs to be updated if the TOs changes
export const expectedWorldTO: BackendWorldTO = {
  worldName: expect.any(String),
  worldGoal: expect.any(String),
  spaces: expect.any(Array),
  description: expect.any(String),
  goals: expect.any(String),
};

export const expectedSpaceTO: BackendSpaceTO = {
  id: expect.any(Number),
  name: expect.any(String),
  elements: expect.any(Array),
  description: expect.any(String),
  goals: expect.any(String),
  requirements: expect.any(Array),
  requiredScore: expect.any(Number),
};

export const expectedElementTO: Partial<ElementTO> = {
  id: expect.any(Number),
  name: expect.any(String),
  value: expect.any(Number),
  description: expect.any(String),
  goals: expect.any(String),
  type: expect.any(String),
  //parentSpaceID: expect.any(Number),
};

export const mockDSL: IDSL = {
  fileVersion: "0.3",
  amgVersion: "0.3.2",
  author: "wAuthors",
  language: "de",
  world: {
    lmsElementIdentifier: {
      type: "moduleName",
      value: "worldName",
    },
    worldName: "worldName",
    worldDescription: "wDescription",
    worldGoals: ["wGoal"],
    topics: [
      {
        topicId: 1,
        topicName: "tbereich1",
        topicContents: [1, 2],
      },
      {
        topicId: 2,
        topicName: "tbereich2",
        topicContents: [3],
      },
      {
        topicId: 3,
        topicName: "tbereich3",
        topicContents: [4, 5],
      },
    ],
    spaces: [
      {
        spaceId: 1,
        lmsElementIdentifier: {
          type: "moduleName",
          value: "raum1",
        },
        spaceName: "raum1",
        spaceDescription: "rdescription1",
        spaceGoals: ["rgoals1"],
        spaceContents: [1],
        requiredPointsToComplete: 1,
        requiredSpacesToEnter: "",
      },
      {
        spaceId: 2,
        lmsElementIdentifier: {
          type: "moduleName",
          value: "raum2",
        },
        spaceName: "raum2",
        spaceDescription: "rdescription2",
        spaceGoals: ["rgoals2"],
        spaceContents: [2],
        requiredPointsToComplete: 1,
        requiredSpacesToEnter: "",
      },
      {
        spaceId: 3,
        lmsElementIdentifier: {
          type: "moduleName",
          value: "raum3",
        },
        spaceName: "raum3",
        spaceDescription: "rdescription3",
        spaceGoals: ["rgoals3"],
        spaceContents: [3],
        requiredPointsToComplete: 1,
        requiredSpacesToEnter: "",
      },
      {
        spaceId: 4,
        lmsElementIdentifier: {
          type: "moduleName",
          value: "raum4",
        },
        spaceName: "raum4",
        spaceDescription: "rdescription4",
        spaceGoals: ["rgoals4"],
        spaceContents: [4],
        requiredPointsToComplete: 3,
        requiredSpacesToEnter: "(3)v((2)^(1))",
      },
      {
        spaceId: 5,
        lmsElementIdentifier: {
          type: "moduleName",
          value: "raum5",
        },
        spaceName: "raum5",
        spaceDescription: "rdescription5",
        spaceGoals: ["rgoals5"],
        spaceContents: [5],
        requiredPointsToComplete: 1,
        requiredSpacesToEnter: "4",
      },
    ],
    elements: [
      {
        elementId: 1,
        lmsElementIdentifier: {
          type: "moduleName",
          value: "bild",
        },
        elementName: "bild",
        elementDescription: "bildbesch",
        elementGoals: ["bildgoals"],
        elementCategory: "image",
        elementFileType: "png",
        elementMaxScore: 1,
      },
      {
        elementId: 2,
        lmsElementIdentifier: {
          type: "moduleName",
          value: "pdf",
        },
        elementName: "pdf",
        elementDescription: "pdfbes",
        elementGoals: ["pdfgoa"],
        elementCategory: "pdf",
        elementFileType: "pdf",
        elementMaxScore: 1,
      },
      {
        elementId: 3,
        lmsElementIdentifier: {
          type: "moduleName",
          value: "text",
        },
        elementName: "text",
        elementDescription: "textbesch",
        elementGoals: ["textgoa"],
        elementCategory: "text",
        elementFileType: "txt",
        elementMaxScore: 1,
      },
      {
        elementId: 4,
        lmsElementIdentifier: {
          type: "moduleName",
          value: "yturl",
        },
        elementName: "yturl",
        elementDescription: "yt",
        elementGoals: ["goals"],
        elementCategory: "video",
        elementFileType: "url",
        elementMaxScore: 2,
      },
      {
        elementId: 5,
        lmsElementIdentifier: {
          type: "moduleName",
          value: "h5pfile",
        },
        elementName: "h5pfile",
        elementDescription: "h5pbes",
        elementGoals: ["h5pgoals"],
        elementCategory: "h5p",
        elementFileType: "h5p",
        elementMaxScore: 2,
      },
    ],
  },
};
