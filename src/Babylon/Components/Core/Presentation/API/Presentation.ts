import { injectable, inject } from "inversify";
import { BusinessLogic } from "../../BusinessLogic/API/BusinessLogic";
import { IBusinessLogic } from "./IBusinessLogic";
import { IPresentation } from "./IPresentation";

@injectable()
export class Presentation implements IPresentation {
  private _businessLogic: IBusinessLogic;

  constructor(@inject(BusinessLogic) businessLogic?: IBusinessLogic) {
    if (businessLogic) {
      this._businessLogic = businessLogic;
    } else {
      this._businessLogic = new BusinessLogic();
    }
  }
}

//Present walls and floor, depending on data in entities
