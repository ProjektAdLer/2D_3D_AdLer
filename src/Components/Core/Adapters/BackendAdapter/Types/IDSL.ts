// these types define the JSON data structure of the DSL that is returned by the backend

type KeyValuePair = {
  type: string;
  value: string;
};

export type APIWorld = {
  idNumber: string;
  identifier: KeyValuePair;
  learningWorldContent: number[];
  goals: string;
  learningSpaces: APISpace[];
  learningElements: APIElement[];
  description: string;
};

export type APISpace = {
  spaceId: number;
  identifier: KeyValuePair;
  description: string;
  goals: string;
  learningSpaceContent: number[];
  requirements: number[];
  requiredPoints: number;
  includedPoints: number;
};

export type APIElement = {
  id: number;
  identifier: KeyValuePair;
  description: string;
  goals: string;
  elementCategory: string;
  learningElementValueList: KeyValuePair[];
  learningSpaceParentId: number;
};

type IDSL = {
  learningWorld: APIWorld;
};

export default IDSL;
