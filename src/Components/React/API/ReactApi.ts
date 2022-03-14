import { inject, injectable } from "inversify";
import IReactBusinessLogic from "../BusinessLogic/API/IReactBusinessLogic";
import REACT_TYPES from "../DependencyInjection/ReactTypes";
import IReactApi from "./IReactAPI";

@injectable()
export default class ReactApi implements IReactApi {
  constructor(
    @inject(REACT_TYPES.IReactBusinessLogic)
    private buisinessLogic: IReactBusinessLogic
  ) {}
  initReact() {
    this.buisinessLogic.setupReact();
  }
}
