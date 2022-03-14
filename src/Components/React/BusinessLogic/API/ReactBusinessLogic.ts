import { inject, injectable } from "inversify";
import REACT_TYPES from "../../DependencyInjection/ReactTypes";
import ICoreRenderer from "../CoreRenderer/ICoreRenderer";
import IReactBusinessLogic from "./IReactBusinessLogic";

@injectable()
export default class ReactBusinessLogic implements IReactBusinessLogic {
  constructor(
    @inject(REACT_TYPES.IReactCoreRenderer) private coreRenderer: ICoreRenderer
  ) {}
  setupReact(): void {
    this.coreRenderer.setupReact();
  }
}
