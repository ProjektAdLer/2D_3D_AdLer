import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import NarrativeFrameworkIntroViewModel from "./NarrativeFrameworkIntroViewModel";
import INarrativeFrameworkIntroController from "./INarrativeFrameworkIntroController";
import INarrativeFrameworkIntroPresenter from "./INarrativeFrameworkIntroPresenter";
import NarrativeFrameworkIntroController from "./NarrativeFrameworkIntroController";
import NarrativeFrameworkIntroPresenter from "./NarrativeFrameworkIntroPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";
import IGetNarrativeFrameworkInfoUseCase from "src/Components/Core/Application/UseCases/GetNarrativeFrameworkInfo/IGetNarrativeFrameworkInfoUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";

@injectable()
export default class NarrativeFrameworkIntroBuilder extends PresentationBuilder<
  NarrativeFrameworkIntroViewModel,
  INarrativeFrameworkIntroController,
  undefined,
  INarrativeFrameworkIntroPresenter
> {
  constructor() {
    super(
      NarrativeFrameworkIntroViewModel,
      NarrativeFrameworkIntroController,
      undefined,
      NarrativeFrameworkIntroPresenter,
    );

    console.log("builder");
  }

  override buildPresenter(): void {
    super.buildPresenter();

    if (
      CoreDIContainer.isBound(
        PRESENTATION_TYPES.INarrativeFrameworkIntroPresenter,
      )
    )
      CoreDIContainer.unbind(
        PRESENTATION_TYPES.INarrativeFrameworkIntroPresenter,
      );

    CoreDIContainer.bind<INarrativeFrameworkIntroPresenter>(
      PRESENTATION_TYPES.INarrativeFrameworkIntroPresenter,
    ).toConstantValue(this.presenter!);

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());

    CoreDIContainer.get<IGetNarrativeFrameworkInfoUseCase>(
      USECASE_TYPES.IGetNarrativeFrameworkInfoUseCase,
    ).execute();
  }
}
