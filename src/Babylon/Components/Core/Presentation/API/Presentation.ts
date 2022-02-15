import { injectable, inject } from "inversify";
import BusinessLogic from "../../BusinessLogic/API/BusinessLogic";
import IBusinessLogic from "./IBusinessLogic";
import IPresentation from "./IPresentation";

@injectable()
export default class Presentation implements IPresentation {
  private businessLogic: IBusinessLogic;

  constructor(@inject(BusinessLogic) businessLogic?: IBusinessLogic) {
    console.log("Presentation");
    if (businessLogic) {
      this.businessLogic = businessLogic;
    } else {
      this.businessLogic = new BusinessLogic();
    }
  }

  public getBusinessLogic = (): IBusinessLogic => {
    return this.businessLogic;
  };
}
