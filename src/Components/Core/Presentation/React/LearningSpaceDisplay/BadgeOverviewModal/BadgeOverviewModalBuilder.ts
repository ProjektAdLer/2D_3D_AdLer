import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import BadgeOverviewModalViewModel from "./BadgeOverviewModalViewModel";
import IBadgeOverviewModalPresenter from "./IBadgeOverviewModalPresenter";
import BadgeOverviewModalPresenter from "./BadgeOverviewModalPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import IGetLearningWorldUseCase from "src/Components/Core/Application/UseCases/GetLearningWorld/IGetLearningWorldUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import IBadgeOverviewModalController from "./IBadgeOverviewModalController";
import BadgeOverviewModalController from "./BadgeOverviewModalController";

@injectable()
export default class BadgeOverviewModalBuilder extends PresentationBuilder<
  BadgeOverviewModalViewModel,
  IBadgeOverviewModalController,
  undefined,
  IBadgeOverviewModalPresenter
> {
  constructor() {
    super(
      BadgeOverviewModalViewModel,
      BadgeOverviewModalController,
      undefined,
      BadgeOverviewModalPresenter,
    );
  }
  override buildPresenter(): void {
    super.buildPresenter();

    if (
      CoreDIContainer.isBound(PRESENTATION_TYPES.IBadgeOverviewModalPresenter)
    )
      CoreDIContainer.unbind(PRESENTATION_TYPES.IBadgeOverviewModalPresenter);

    CoreDIContainer.bind<IBadgeOverviewModalPresenter>(
      PRESENTATION_TYPES.IBadgeOverviewModalPresenter,
    ).toConstantValue(this.presenter!);

    CoreDIContainer.get<IGetLearningWorldUseCase>(
      USECASE_TYPES.IGetLearningWorldUseCase,
    ).execute();
  }
}
