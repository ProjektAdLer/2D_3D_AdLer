import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import IAsyncPresentationBuilder from "../../PresentationBuilder/IAsyncPresentationBuilder";
import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";

export default interface IDecorationBuilder extends IAsyncPresentationBuilder {
  spaceTemplate: LearningSpaceTemplateType;
  theme: LearningSpaceThemeType;
}
