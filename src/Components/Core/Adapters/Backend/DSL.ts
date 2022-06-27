export default interface DSL {
  learningWorld: {
    identifier: {
      type: string;
      value: string;
    };
    learningWorldContent: number[];
    topics: number[];
    learningSpaces: {
      spaceId: number;
      learningSpaceName: string;
      identifier: {
        type: string;
        value: string;
      };
      learningSpaceContent: number[];
      requirements: { type: string; value: number }[] | null;
    }[];
    learningElements: {
      id: number;
      identifier: {
        type: string;
        value: string;
      };
      elementType: string;
      learningElementValue: { type: string; value: number } | null;
      requirements: { type: string; value: number }[] | null;
      metaData: { key: string; value: string }[];
    }[];
  };
}
