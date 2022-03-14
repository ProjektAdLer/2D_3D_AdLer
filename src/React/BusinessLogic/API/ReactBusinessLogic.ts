import { inject, injectable } from "inversify";
import REACT_TYPES from "../../DependencyInjection/ReactTypes";
import ICoreRenderer from "../CoreRenderer/ICoreRenderer";
import IReactBuisnessLogic from "./IReactBuisnessLogic";

@injectable()
export default class ReactBuisinessLogic implements IReactBuisnessLogic {
  constructor(
    @inject(REACT_TYPES.IReactCoreRenderer) private coreRenderer: ICoreRenderer
  ) {}
  setupReact(): void {
    this.coreRenderer.setupReact();
  }
}
