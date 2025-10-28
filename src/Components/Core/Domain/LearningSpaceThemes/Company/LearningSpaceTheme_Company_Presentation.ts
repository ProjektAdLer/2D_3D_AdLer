import ILearningSpaceTheme from "../ILearningSpaceTheme";
import LearningSpaceTheme_Suburb from "../Legacy/LearningSpaceTheme_Suburb";
import {
  SharedCampusLearningElements,
  SharedCampusStoryElement,
} from "../SharedThemeElements";

// TODO: Implement actual Company Presentation sub-theme when assets are available
export const LearningSpaceTheme_Company_Presentation: ILearningSpaceTheme = {
  ...LearningSpaceTheme_Suburb, // PLACEHOLDER
  learningElementModels: SharedCampusLearningElements,
  storyElementModel: SharedCampusStoryElement,
};
