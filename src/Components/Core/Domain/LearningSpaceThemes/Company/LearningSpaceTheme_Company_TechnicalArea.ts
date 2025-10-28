import ILearningSpaceTheme from "../ILearningSpaceTheme";
import LearningSpaceTheme_Suburb from "../Legacy/LearningSpaceTheme_Suburb";
import {
  SharedCampusLearningElements,
  SharedCampusStoryElement,
} from "../SharedThemeElements";

// TODO: Implement actual Company TechnicalArea sub-theme when assets are available
export const LearningSpaceTheme_Company_TechnicalArea: ILearningSpaceTheme = {
  ...LearningSpaceTheme_Suburb, // PLACEHOLDER
  learningElementModels: SharedCampusLearningElements,
  storyElementModel: SharedCampusStoryElement,
};
