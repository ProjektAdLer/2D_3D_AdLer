import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import IDecorationPresenter from "./IDecorationPresenter";
import DecorationViewModel from "./DecorationViewModel";

export default class DecorationPresenter implements IDecorationPresenter {
  constructor(private viewModel: DecorationViewModel) {
    if (!this.viewModel) {
      throw new Error("ViewModel was passed as undefined");
    }
  }
  presentDecoration(learningSpaceTemplateType: LearningSpaceTemplateType) {
    console.log("presentDeco", learningSpaceTemplateType);
    this.viewModel.learningSpaceTemplateType.Value = learningSpaceTemplateType;
  }
}
