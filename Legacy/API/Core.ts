import { inject, injectable } from "inversify";
import IPresentation from "../Presentation/API/IPresentation";
import ICore from "./ICore";
import CORE_TYPES from "../DependencyInjection/CoreTypes";

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
