// IMPORTANT: type string names have to be all-uppercase
export enum LearningSpaceThemeType {
  // Legacy Themes for backwards compatibility
  Campus = "CAMPUS",
  CampusMensa = "CAMPUSMENSA",
  CampusLibrary = "CAMPUSLIBRARY",
  CampusStudentClub = "CAMPUSSTUDENTCLUB",
  CampusServerRoom = "CAMPUSSERVERROOM",
  CampusAuditorium = "CAMPUSAUDITORIUM",
  CampusLabor = "CAMPUSLABOR",
  Arcade = "ARCADE",

  // World Themes
  CampusAB = "CAMPUSASCHAFFENBURG",
  CampusKE = "CAMPUSKEMPTEN",
  Suburb = "SUBURB",
  Company = "COMPANY",

  // Sub-Themes (WorldTheme_SpaceTheme)
  // CampusAB
  CampusAB_LearningArea = "CAMPUSASCHAFFENBURG_LEARNINGAREA",
  CampusAB_EatingArea = "CAMPUSASCHAFFENBURG_EATINGAREA",
  CampusAB_Presentation = "CAMPUSASCHAFFENBURG_PRESENTATION",
  CampusAB_FnE = "CAMPUSASCHAFFENBURG_FNE",
  CampusAB_SocialArea = "CAMPUSASCHAFFENBURG_SOCIALAREA",
  CampusAB_TechnicalArea = "CAMPUSASCHAFFENBURG_TECHNICALAREA",

  // CampusKE
  CampusKE_LearningArea = "CAMPUSKEMPTEN_LEARNINGAREA",
  CampusKE_EatingArea = "CAMPUSKEMPTEN_EATINGAREA",
  CampusKE_Presentation = "CAMPUSKEMPTEN_PRESENTATION",
  CampusKE_FnE = "CAMPUSKEMPTEN_FNE",
  CampusKE_SocialArea = "CAMPUSKEMPTEN_SOCIALAREA",
  CampusKE_TechnicalArea = "CAMPUSKEMPTEN_TECHNICALAREA",

  // Suburb
  Suburb_LearningArea = "SUBURB_LEARNINGAREA",
  Suburb_EatingArea = "SUBURB_EATINGAREA",
  Suburb_Presentation = "SUBURB_PRESENTATION",
  Suburb_FnE = "SUBURB_FNE",
  Suburb_SocialArea = "SUBURB_SOCIALAREA",
  Suburb_TechnicalArea = "SUBURB_TECHNICALAREA",

  // Company
  Company_LearningArea = "COMPANY_LEARNINGAREA",
  Company_EatingArea = "COMPANY_EATINGAREA",
  Company_Presentation = "COMPANY_PRESENTATION",
  Company_FnE = "COMPANY_FNE",
  Company_SocialArea = "COMPANY_SOCIALAREA",
  Company_TechnicalArea = "COMPANY_TECHNICALAREA",
}
