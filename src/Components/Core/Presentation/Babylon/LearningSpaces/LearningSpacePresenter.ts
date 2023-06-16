import { injectable } from "inversify";
import BUILDER_TYPES from "../../../DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import IPresentationBuilder from "../../PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";
import IDoorPresenter from "../Door/IDoorPresenter";
import LearningSpaceViewModel from "./LearningSpaceViewModel";
import ILearningSpacePresenter from "./ILearningSpacePresenter";
import ILearningElementPresenter from "../LearningElements/ILearningElementPresenter";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import LearningElementView from "../LearningElements/LearningElementView";
import IWindowPresenter from "../Window/IWindowPresenter";
import IDecorationPresenter from "../Decoration/IDecorationPresenter";

@injectable()
export default class LearningSpacePresenter implements ILearningSpacePresenter {
  private director: IPresentationDirector;

  constructor(private viewModel: LearningSpaceViewModel) {
    if (!this.viewModel) {
      throw new Error("ViewModel is not defined");
    }

    this.director = CoreDIContainer.get<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    );
  }

  async asyncSetupSpace(spaceTO: LearningSpaceTO): Promise<void> {
    this.createLearningElements(spaceTO);
    this.createWindows();
    if (this.viewModel.exitDoorPosition.Value) this.createExitDoor();
    if (this.viewModel.entryDoorPosition.Value) this.createEntryDoor();
    this.createDecoration();
  }

  private createLearningElements(spaceTO: LearningSpaceTO): void {
    const elementBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.ILearningElementBuilder
    );

    spaceTO.elements.forEach((elementTO) => {
      // skip empty element slots
      if (!elementTO) return;

      this.director.build(elementBuilder);
      (
        elementBuilder.getPresenter() as ILearningElementPresenter
      ).presentLearningElement(
        elementTO,
        this.viewModel.elementPositions.Value.shift()!
      );
      (elementBuilder.getView() as LearningElementView).setupLearningElement();
      elementBuilder.reset();
    });
  }

  private createExitDoor(): void {
    const doorBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.IDoorBuilder
    );

    this.director.build(doorBuilder);
    (doorBuilder.getPresenter() as IDoorPresenter).presentDoor(
      this.viewModel.exitDoorPosition.Value,
      true,
      this.viewModel.id
    );
  }

  private createEntryDoor(): void {
    const doorBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.IDoorBuilder
    );

    this.director.build(doorBuilder);
    (doorBuilder.getPresenter() as IDoorPresenter).presentDoor(
      this.viewModel.entryDoorPosition.Value,
      false,
      this.viewModel.id
    );
  }

  private createWindows(): void {
    for (const windowPosition of this.viewModel.windowPositions.Value) {
      const windowBuilder = CoreDIContainer.get<IPresentationBuilder>(
        BUILDER_TYPES.IWindowBuilder
      );

      this.director.build(windowBuilder);
      (windowBuilder.getPresenter() as IWindowPresenter).presentWindow(
        windowPosition
      );
    }
  }

  private createDecoration(): void {
    const decorationBuilder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.IDecorationBuilder
    );

    this.director.build(decorationBuilder);
    (
      decorationBuilder.getPresenter() as IDecorationPresenter
    ).presentDecoration(this.viewModel.learningSpaceTemplateType.Value);
  }
}
