import { LearningElementTypeStrings } from "./LearningElementTypes";

export type LearningElementInfo = {
  type: LearningElementTypeStrings;
  name: string;
  hasScored: boolean;
  points: number;
  isRequired: boolean | null;
};
