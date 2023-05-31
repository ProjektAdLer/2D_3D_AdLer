export enum LearningSpaceTemplateType {
  L = "L_32X31_10L",
  R6 = "R_20X20_6L",
  R8 = "R_20X30_8L",
  None = "",
}

export type LearningSpaceTemplateStrings =
  keyof typeof LearningSpaceTemplateType;
