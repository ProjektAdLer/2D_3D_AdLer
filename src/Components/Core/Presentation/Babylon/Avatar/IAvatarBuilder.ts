import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import IAsyncPresentationBuilder from "../../PresentationBuilder/IAsyncPresentationBuilder";
import ILearningSpacePresenter from "../LearningSpaces/ILearningSpacePresenter";

export default interface IAvatarBuilder extends IAsyncPresentationBuilder {
  learningSpaceTemplateType: LearningSpaceTemplateType;
  learningSpacePresenter: ILearningSpacePresenter;
}
