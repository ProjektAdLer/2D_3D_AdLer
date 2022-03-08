import { inject, injectable } from "inversify";
import IPresentation from "../Presentation/API/IPresentation";
import ICore from "./ICore";
import IBusinessLogic from "../Presentation/API/IBusinessLogic";
import CORE_TYPES from "../DependencyInjection/types";
import { H5PForCoursesAPIResponse } from "../Types/H5PTypes";

@injectable()
export default class Core implements ICore {
  presentation: IPresentation;
  businessLogic: IBusinessLogic;
  public constructor(
    @inject(CORE_TYPES.IPresentation) presentation: IPresentation
  ) {
    this.presentation = presentation;
    this.businessLogic = presentation.BusinessLogic;
    console.log("Core created");
  }
  async getAllH5Ps(courseId: number): Promise<H5PForCoursesAPIResponse> {
    return await this.businessLogic.getAllH5Ps(courseId);
  }

  async setupBabylon(canvas: HTMLCanvasElement): Promise<void> {
    await this.presentation.setupBabylon(canvas);
  }

  async setupMoodle(): Promise<void> {
    this.businessLogic.setupMooodle();
  }
}
