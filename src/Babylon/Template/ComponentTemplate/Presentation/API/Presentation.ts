import { injectable, inject } from "inversify";
import BusinessLogic from "../../BusinessLogic/API/BusinessLogic";
import IBusinessLogic from "./IBusinessLogic";
import IPresentation from "./IPresentation";

@injectable()
export default class Presentation implements IPresentation {
  private businessLogic: IBusinessLogic;

  constructor(@inject(BusinessLogic) businessLogic?: IBusinessLogic) {}
}
