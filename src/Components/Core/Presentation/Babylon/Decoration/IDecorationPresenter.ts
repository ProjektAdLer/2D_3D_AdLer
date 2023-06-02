import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";

export default interface IDecorationPresenter extends ILearningWorldAdapter {
  presentDecoration(learningSpaceTemplateType: LearningSpaceTemplateType): void;
}
