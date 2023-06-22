import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import IAsyncPresentationBuilder from "../../PresentationBuilder/IAsyncPresentationBuilder";

export default interface IDecorationBuilder extends IAsyncPresentationBuilder {
  spaceTemplate: LearningSpaceTemplateType;
}
