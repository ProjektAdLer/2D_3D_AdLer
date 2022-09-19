// these types define the JSON data structure of the DSL that is returned by the backend

type Identifier = {
  type: string;
  value: string;
};

type Requirements =
  | {
      type: string;
      value: number;
    }[]
  | null;

type ElementValueList = {
  type: string;
  value: string;
} | null;

type MetaData = {
  key: string;
  value: string;
};

export type APIWorld = {
  idNumber: string;
  identifier: Identifier;
  learningWorldContent: number[];
  topics: number[];
  goals: string;
  learningSpaces: APISpace[];
  learningElements: APIElement[];
  description: string;
};

export type APISpace = {
  spaceId: number;
  identifier: Identifier;
  description: string;
  goals: string;
  learningSpaceContent: number[];
  requirements: Requirements;
};

export type APIElement = {
  id: number;
  identifier: Identifier;
  description: string;
  goals: string;
  elementType: string;
  learningElementValueList: ElementValueList[];
  learningSpaceParentId: number;
  requirements?: any;
  metaData: MetaData[] | null;
};

type IDSL = {
  learningWorld: APIWorld;
};

export default IDSL;
