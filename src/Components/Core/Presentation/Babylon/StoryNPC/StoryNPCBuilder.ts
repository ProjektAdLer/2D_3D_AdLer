import { injectable } from "inversify";
import StoryNPCController from "./StoryNPCController";
import StoryNPCPresenter from "./StoryNPCPresenter";
import IStoryNPCController from "./IStoryNPCController";
import IStoryNPCPresenter from "./IStoryNPCPresenter";
import StoryNPCViewModel from "./StoryNPCViewModel";
import StoryNPCView from "./StoryNPCView";
import AsyncPresentationBuilder from "../../PresentationBuilder/AsyncPresentationBuilder";
import { LearningElementModel } from "src/Components/Core/Domain/LearningElementModels/LearningElementModelTypes";
import IStoryNPCBuilder from "./IStoryNPCBuilder";

/*
This Template Provides the whole scaffolding for a React Component.
Copy below lines in the DI Container and its Types

bind<IPresentationBuilder>(BUILDER_TYPES.IStoryNPCBuilder).to(StoryNPCBuilder);
IStoryNPCBuilder: Symbol("IStoryNPCBuilder"),

director.Builder = CoreDIContainer.get<IPresentationBuilder>(
  BUILDER_TYPES.IStoryNPCBuilder
);
director.build();
*/

@injectable()
export default class StoryNPCBuilder
  extends AsyncPresentationBuilder<
    StoryNPCViewModel,
    IStoryNPCController,
    StoryNPCView,
    IStoryNPCPresenter
  >
  implements IStoryNPCBuilder
{
  constructor() {
    super(
      StoryNPCViewModel,
      StoryNPCController,
      StoryNPCView,
      StoryNPCPresenter
    );
  }

  public modelType: LearningElementModel;

  override buildViewModel(): void {
    super.buildViewModel();
    this.viewModel!.modelType = this.modelType;
  }

  override buildView(): void {
    super.buildView();
    this.view!.asyncSetupStoryNPC().then(
      () => this.resolveIsCompleted(),
      (e) => console.log(e)
    );
  }
}
