import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";
import IAsyncPresentationBuilder from "../../PresentationBuilder/IAsyncPresentationBuilder";

export interface IAmbienceBuilder extends IAsyncPresentationBuilder {
  theme: LearningSpaceThemeType;
}
