import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
import ILearningWorldDetailPresenter from "./ILearningWorldDetailPresenter";
import LearningWorldDetailViewModel, {
  LearningWorldDetailLearningSpaceData,
} from "./LearningWorldDetailViewModel";

export default class LearningWorldDetailPresenter
  implements ILearningWorldDetailPresenter
{
  constructor(private viewModel: LearningWorldDetailViewModel) {}
  onLearningWorldLoaded(world: LearningWorldTO): void {
    let spaces: LearningWorldDetailLearningSpaceData[] = [];

    world.spaces.forEach((space) => {
      spaces.push({
        id: space.id,
        name: space.name,
        isCompleted: space.currentScore >= space.requiredScore,
      });
    });

    this.viewModel.spaces.Value = spaces;
    this.viewModel.name.Value = world.name;
    this.viewModel.description.Value = world.description;
    this.viewModel.goals.Value = world.goals;
  }
}
