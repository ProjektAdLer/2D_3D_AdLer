// these types define the JSON data structure of the DSL that is returned by the backend

export interface IDSL {
  fileVersion: string;
  amgVersion: string;
  author: string;
  language: string;
  world: APIWorld;
}

export interface APIWorld {
  lmsElementIdentifier: APILmsElementIdentifier;
  worldName: string;
  worldDescription: string;
  worldGoals: string[];
  topics: APITopic[];
  spaces: APISpace[];
  elements: APIElement[];
}

export interface APILmsElementIdentifier {
  type: string;
  value: string;
}

export interface APITopic {
  topicId: number;
  topicName: string;
  topicContents: number[];
}

export interface APISpace {
  spaceId: number;
  lmsElementIdentifier: APILmsElementIdentifier;
  spaceName: string;
  spaceDescription: string;
  spaceGoals: string[];
  spaceContents: number[];
  requiredPointsToComplete: number;
  requiredSpacesToEnter: string;
}

export interface APIElement {
  elementId: number;
  lmsElementIdentifier: APILmsElementIdentifier;
  elementName: string;
  elementDescription: string;
  elementGoals: string[];
  elementCategory: string;
  elementFileType: string;
  elementMaxScore: number;
}

export default IDSL;
