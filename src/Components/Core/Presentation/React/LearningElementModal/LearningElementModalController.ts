import ILearningElementModalController from "./ILearningElementModalController";
import LearningElementModalViewModel from "./LearningElementModalViewModel";

export default class LearningElementModalController
  implements ILearningElementModalController
{
  constructor(private viewModel: LearningElementModalViewModel) {}
}
