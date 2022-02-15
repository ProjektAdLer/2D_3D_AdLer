import Presentation from "./../Presentation/API/Presentation";
import { inject, injectable } from "inversify";
import IPresentation from "../Presentation/API/IPresentation";
import ICore from "./ICore";
import IBusinessLogic from "../Presentation/API/IBusinessLogic";

@injectable()
export default class Core implements ICore {
  presentationLayer: IPresentation;
  businessLogic: IBusinessLogic;
  public constructor(@inject(Presentation) presentation: IPresentation) {
    this.presentationLayer = presentation;
    this.businessLogic = presentation.getBusinessLogic();
    console.log("Core created");
  }

  public CreateEngine = async (canvas: HTMLCanvasElement) => {
    this.businessLogic.CreateEngine(canvas);
  };
}
