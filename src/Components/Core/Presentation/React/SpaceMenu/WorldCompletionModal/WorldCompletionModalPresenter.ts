import IWorldCompletionModalPresenter from "./IWorldCompletionModalPresenter";
import WorldCompletionModalViewModel from "./WorldCompletionModalViewModel";

export default class WorldCompletionModalPresenter
  implements IWorldCompletionModalPresenter
{
  constructor(private viewModel: WorldCompletionModalViewModel) {}
}
