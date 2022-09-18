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
  worldContent: number[];
  topics: number[];
  goals: string;
  spaces: APISpace[];
  elements: APIElement[];
  description: string;
};

export type APISpace = {
  spaceId: number;
  identifier: Identifier;
  description: string;
  goals: string;
  spaceContent: number[];
  requirements: Requirements;
};

export type APIElement = {
  id: number;
  identifier: Identifier;
  description: string;
  goals: string;
  elementType: string;
  elementValueList: ElementValueList[];
  spaceParentId: number;
  requirements?: any;
  metaData: MetaData[] | null;
};

type IDSL = {
  world: APIWorld;
};

export default IDSL;
