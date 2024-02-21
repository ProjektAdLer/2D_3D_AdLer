// IMPORTANT: type string names have to be all-uppercase
export enum LearningSpaceTemplateType {
  L = "L_32X31_10L",
  T = "T_40X32_13L",
  R6 = "R_20X20_6L",
  R8 = "R_20X30_8L",
  D = "D_40X37_15L",
  None = "",
}

export type LearningSpaceTemplateStrings =
  keyof typeof LearningSpaceTemplateType;
