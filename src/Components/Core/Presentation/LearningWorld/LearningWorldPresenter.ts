import { injectable } from "inversify";
import ILearningWorldPort, {
  LearningWorldTO,
} from "../../Application/LoadWorld/ILearningWorldPort";
import LearningWorldViewModel from "./LearningWorldViewModel";

@injectable()
export default class LearningWorldPresenter implements ILearningWorldPort {
  private viewModel: LearningWorldViewModel;

  public presentLearningWorld(learningWorldTO: LearningWorldTO): void {
    this.viewModel.id = learningWorldTO.id;
  }
}
