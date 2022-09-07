type Identifier = {
  type: string;
  value: string;
};

type Requirement =
  | {
      type: string;
      value: number;
    }[]
  | null;

type LearningElementValue = {
  type: string;
  value: number;
} | null;

export default interface DSL {
  learningWorld: {
    identifier: Identifier;
    learningWorldContent: number[];
    topics: number[];
    goal: string;
    learningSpaces: {
      spaceId: number;
      learningSpaceName: string;
      identifier: Identifier;
      learningSpaceContent: number[];
      requirements: Requirement;
    }[];
    learningElements: {
      id: number;
      identifier: Identifier;
      elementType: string;
      learningElementValue: LearningElementValue;
      requirements: Requirement;
      metaData: { key: string; value: string }[];
    }[];
  };
}
