// these types define the JSON data structure of the DSL that is returned by the backend

export interface IDSL {
  fileVersion: string;
  amgVersion: string;
  author: string;
  language: string;
  world: APIWorld;
}

export interface APIWorld {
  worldName: string;
  worldDescription: string;
  worldGoals: string[];
  topics: APITopic[];
  spaces: APISpace[];
  elements: APIElement[];
}

export interface APITopic {
  topicId: number;
  topicName: string;
  topicContents: number[];
}

type SpaceSlotItem = number | null;

export interface APISpace {
  spaceId: number;
  spaceName: string;
  spaceDescription: string;
  spaceGoals: string[];
  spaceSlotContents: SpaceSlotItem[];
  requiredPointsToComplete: number;
  requiredSpacesToEnter: string;
  roomTemplate: string;
  roomTemplateStyle: string;
}

export interface APIElement {
  elementId: number;
  elementName: string;
  elementDescription: string;
  elementGoals: string[];
  elementCategory: string;
  elementFileType: string;
  elementMaxScore: number;
  elementModel: string;
}

export default IDSL;
