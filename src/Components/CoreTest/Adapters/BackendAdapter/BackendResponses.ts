import LearningElementTO from "../../../Core/Application/DataTransferObjects/LearningElementTO";
import IDSL from "../../../Core/Adapters/BackendAdapter/Types/IDSL";
import BackendWorldTO from "../../../Core/Application/DataTransferObjects/BackendWorldTO";
import BackendSpaceTO from "../../../Core/Application/DataTransferObjects/BackendSpaceTO";
import BackendAdapterUtils from "../../../Core/Adapters/BackendAdapter/BackendAdapterUtils";
import BackendElementTO from "../../../Core/Application/DataTransferObjects/BackendElementTO";
import {
  LearningElementModel,
  LearningElementModelTypeEnums,
} from "../../../Core/Domain/Types/LearningElementModelTypes";
import { LearningSpaceTemplateType } from "../../../Core/Domain/Types/LearningSpaceTemplateType";

export const minimalGetWorldDataResponse: BackendWorldTO = {
  worldName: "TestWorld",
  goals: ["TestGoal"],
  description: "TestDescription",
  spaces: [
    {
      description: "TestDescription",
      goals: ["TestGoals"],
      requirements: "",
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
          goals: ["TestGoals"],
          model: LearningElementModelTypeEnums.TextElementModelTypes.Bookshelf1,
        },
      ],
      template: LearningSpaceTemplateType.L,
    },
  ],
};

// expected structure of the TOs
// this needs to be updated if the TOs changes
export const expectedWorldTO: BackendWorldTO = {
  worldName: expect.any(String),
  goals: expect.arrayContaining([expect.any(String)]),
  spaces: expect.any(Array),
  description: expect.any(String),
};

export const expectedSpaceTO: BackendSpaceTO = {
  id: expect.any(Number),
  name: expect.any(String),
  elements: expect.any(Array<BackendElementTO | null>),
  description: expect.any(String),
  goals: expect.arrayContaining([expect.any(String)]),
  requirements: expect.any(String),
  requiredScore: expect.any(Number),
  template: expect.any(String),
};

export const expectedElementTO: Partial<LearningElementTO> = {
  id: expect.any(Number),
  name: expect.any(String),
  value: expect.any(Number),
  description: expect.any(String),
  goals: expect.arrayContaining([expect.any(String)]),
  type: expect.any(String),
  model: expect.any(String),
};

export const mockDSL: IDSL = {
  fileVersion: "0.3",
  amgVersion: "0.3.2",
  author: "wAuthors",
  language: "de",
  world: {
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
        spaceName: "raum1",
        spaceDescription: "rdescription1",
        spaceGoals: ["rgoals1"],
        spaceSlotContents: [1],
        requiredPointsToComplete: 1,
        requiredSpacesToEnter: "",
        spaceTemplate: "",
        spaceTemplateStyle: "",
      },
      {
        spaceId: 2,
        spaceName: "raum2",
        spaceDescription: "rdescription2",
        spaceGoals: ["rgoals2"],
        spaceSlotContents: [2],
        requiredPointsToComplete: 1,
        requiredSpacesToEnter: "",
        spaceTemplate: "",
        spaceTemplateStyle: "",
      },
      {
        spaceId: 3,
        spaceName: "raum3",
        spaceDescription: "rdescription3",
        spaceGoals: ["rgoals3"],
        spaceSlotContents: [3],
        requiredPointsToComplete: 1,
        requiredSpacesToEnter: "",
        spaceTemplate: "",
        spaceTemplateStyle: "",
      },
      {
        spaceId: 4,
        spaceName: "raum4",
        spaceDescription: "rdescription4",
        spaceGoals: ["rgoals4"],
        spaceSlotContents: [4],
        requiredPointsToComplete: 3,
        requiredSpacesToEnter: "(3)v((2)^(1))",
        spaceTemplate: "",
        spaceTemplateStyle: "",
      },
      {
        spaceId: 5,
        spaceName: "raum5",
        spaceDescription: "rdescription5",
        spaceGoals: ["rgoals5"],
        spaceSlotContents: [5],
        requiredPointsToComplete: 1,
        requiredSpacesToEnter: "4",
        spaceTemplate: "",
        spaceTemplateStyle: "",
      },
    ],
    elements: [
      {
        elementId: 1,
        elementName: "bild",
        elementDescription: "bildbesch",
        elementGoals: ["bildgoals"],
        elementCategory: "image",
        elementFileType: "png",
        elementMaxScore: 1,
        elementModel: "",
      },
      {
        elementId: 2,
        elementName: "pdf",
        elementDescription: "pdfbes",
        elementGoals: ["pdfgoa"],
        elementCategory: "pdf",
        elementFileType: "pdf",
        elementMaxScore: 1,
        elementModel: "",
      },
      {
        elementId: 3,
        elementName: "text",
        elementDescription: "textbesch",
        elementGoals: ["textgoa"],
        elementCategory: "text",
        elementFileType: "txt",
        elementMaxScore: 1,
        elementModel: "",
      },
      {
        elementId: 4,
        elementName: "yturl",
        elementDescription: "yt",
        elementGoals: ["goals"],
        elementCategory: "video",
        elementFileType: "url",
        elementMaxScore: 2,
        elementModel: "",
      },
      {
        elementId: 5,
        elementName: "h5pfile",
        elementDescription: "h5pbes",
        elementGoals: ["h5pgoals"],
        elementCategory: "h5p",
        elementFileType: "h5p",
        elementMaxScore: 2,
        elementModel: "",
      },
    ],
  },
};
