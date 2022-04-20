import { inject, injectable } from "inversify";
import IPresentation from "../Presentation/API/IPresentation";
import ICore from "./ICore";
import IBusinessLogic from "../Presentation/API/IBusinessLogic";
import CORE_TYPES from "../DependencyInjection/CoreTypes";
import { H5PForCoursesAPIResponse } from "../Types/H5PTypes";
import CoreDIContainer from "../DependencyInjection/CoreDIContainer";
import IViewModelProvider from "../Presentation/ViewModelProvider/IViewModelProvider";
import LearningElementPanelViewModel from "../Presentation/LearningElementPanel/LearningElementPanelViewModel";

@injectable()
export default class Core implements ICore {
  presentation: IPresentation;
  businessLogic: IBusinessLogic;
  public constructor(
    @inject(CORE_TYPES.IPresentation) presentation: IPresentation
  ) {
    this.presentation = presentation;
    this.businessLogic = presentation.BusinessLogic;
  }

  async getAllH5Ps(courseId: number): Promise<H5PForCoursesAPIResponse> {
    return await this.businessLogic.getAllH5Ps(courseId);
  }

  async setupMoodle(): Promise<void> {
    this.businessLogic.setupMoodle();
  }

  setupReact(): void {
    this.presentation.setupReact();
  }

  async setupBabylon(canvas: HTMLCanvasElement): Promise<void> {
    await this.presentation.setupBabylon(canvas);

    await this.setupMoodle();
  }
}
