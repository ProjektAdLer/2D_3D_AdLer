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

type LearningElementValue = {
  type: string;
  value: number;
} | null;

export type APILearningWorld = {
  identifier: Identifier;
  learningWorldContent: number[];
  topics: number[];
  goal: string;
  learningSpaces: APILearningRoom[];
  learningElements: APILearningElement[];
};

export type APILearningRoom = {
  spaceId: number;
  learningSpaceName: string;
  identifier: Identifier;
  learningSpaceContent: number[];
  requirements: Requirements;
};

export type APILearningElement = {
  id: number;
  identifier: Identifier;
  elementType: string;
  learningElementValue: LearningElementValue;
  requirements: Requirements;
  metaData: { key: string; value: string }[];
};

type IDSL = {
  learningWorld: APILearningWorld;
};

export default IDSL;
