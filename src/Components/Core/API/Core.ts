import { inject, injectable } from "inversify";
import IPresentation from "../Presentation/API/IPresentation";
import ICore from "./ICore";
import CORE_TYPES from "../DependencyInjection/CoreTypes";
import { H5PForCoursesAPIResponse } from "../Types/H5PTypes";
import CoreDIContainer from "../DependencyInjection/CoreDIContainer";
import IViewModelProvider from "../Presentation/ViewModelProvider/IViewModelProvider";
import LearningElementPanelViewModel from "../Presentation/LearningElementPanel/LearningElementPanelViewModel";
import { deprecate } from "util";

@injectable()
export default class Core implements ICore {
  presentation: IPresentation;

  public constructor(
    @inject(CORE_TYPES.IPresentation) presentation: IPresentation
  ) {
    this.presentation = presentation;
  }

  setupReact(): void {
    this.presentation.setupReact();
  }

  async setupBabylon(canvas: HTMLCanvasElement): Promise<void> {
    await this.presentation.setupBabylon(canvas);
  }
}
