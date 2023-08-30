import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import IAsyncPresentationBuilder from "../../PresentationBuilder/IAsyncPresentationBuilder";

export default interface IAvatarBuilder extends IAsyncPresentationBuilder {
  learningSpaceTemplateType: LearningSpaceTemplateType;
}
