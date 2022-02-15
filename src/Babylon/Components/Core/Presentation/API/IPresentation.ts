import IBusinessLogic from "./IBusinessLogic";

export default interface IPresentation {
  getBusinessLogic(): IBusinessLogic;
}
