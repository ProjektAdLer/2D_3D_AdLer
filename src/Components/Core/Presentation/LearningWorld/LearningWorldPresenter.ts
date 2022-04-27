import { injectable } from "inversify";
import ILearningWorldLoadedPort, {
  LearningWorldTO,
} from "../../Application/LoadWorld/ILearningWorldLoadedPort";
import LearningWorldViewModel from "./LearningWorldViewModel";

@injectable()
export default class LearningWorldPresenter
  implements ILearningWorldLoadedPort
{
  private viewModel: LearningWorldViewModel;

  public presentLearningWorld(learningWorldTO: LearningWorldTO): void {
    this.viewModel.id = learningWorldTO.id;
  }
}
