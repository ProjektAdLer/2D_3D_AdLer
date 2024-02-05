export enum LearningSpaceTemplateType {
  L = "L_32X31_10L",
  T = "T_38X31_13L",
  R6 = "R_20X20_6L",
  R8 = "R_20X30_8L",
  R15 = "R_40x37_15L",
  None = "",
}

export type LearningSpaceTemplateStrings =
  keyof typeof LearningSpaceTemplateType;
