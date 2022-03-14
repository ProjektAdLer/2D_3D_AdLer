import { inject, injectable } from "inversify";
import IReactBuisnessLogic from "../BusinessLogic/API/IReactBuisnessLogic";
import REACT_TYPES from "../DependencyInjection/ReactTypes";
import IReactApi from "./IReactAPI";

@injectable()
export default class ReactApi implements IReactApi {
  constructor(
    @inject(REACT_TYPES.IReactBusinessLogic)
    private buisinessLogic: IReactBuisnessLogic
  ) {}
  initReact() {
    this.buisinessLogic.setupReact();
  }
}
