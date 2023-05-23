export enum LearningSpaceTemplateType {
  L = "L_32x31_10L",
  R6 = "R_20x20_6L",
  R8 = "R_20x30_8L",
  None = "",
}

export type LearningSpaceTemplateStrings =
  keyof typeof LearningSpaceTemplateType;
