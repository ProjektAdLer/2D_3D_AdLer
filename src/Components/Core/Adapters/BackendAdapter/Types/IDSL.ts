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

type LearningElementValueList = {
  type: string;
  value: string;
} | null;

type MetaData = {
  key: string;
  value: string;
};

export type APILearningWorld = {
  idNumber: string;
  identifier: Identifier;
  learningWorldContent: number[];
  topics: number[];
  goals: string;
  learningSpaces: APILearningRoom[];
  learningElements: APILearningElement[];
  description: string;
};

export type APILearningRoom = {
  spaceId: number;
  identifier: Identifier;
  description: string;
  goals: string;
  learningSpaceContent: number[];
  requirements: Requirements;
};

export type APILearningElement = {
  id: number;
  identifier: Identifier;
  description: string;
  goals: string;
  elementType: string;
  learningElementValueList: LearningElementValueList[];
  learningSpaceParentId: number;
  requirements?: any;
  metaData: MetaData[] | null;
};

type IDSL = {
  learningWorld: APILearningWorld;
};

export default IDSL;
