import ILearningSpaceTheme from "../ILearningSpaceTheme";
import LearningSpaceTheme_Suburb from "../Legacy/LearningSpaceTheme_Suburb";
import {
  SharedCampusLearningElements,
  SharedCampusStoryElement,
} from "../SharedThemeElements";

// TODO: Replace placeholder implementation with actual Company theme assets
export const LearningSpaceTheme_Company: ILearningSpaceTheme = {
  ...LearningSpaceTheme_Suburb, // PLACEHOLDER: Using Suburb theme until Company theme is implemented
  learningElementModels: SharedCampusLearningElements,
  storyElementModel: SharedCampusStoryElement,
};
