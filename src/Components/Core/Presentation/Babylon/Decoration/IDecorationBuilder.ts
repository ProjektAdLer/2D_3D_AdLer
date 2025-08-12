import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import IAsyncPresentationBuilder from "../../PresentationBuilder/IAsyncPresentationBuilder";
import { ThemeType } from "src/Components/Core/Domain/Types/ThemeTypes";

export default interface IDecorationBuilder extends IAsyncPresentationBuilder {
  spaceTemplate: LearningSpaceTemplateType;
  theme: ThemeType;
}
