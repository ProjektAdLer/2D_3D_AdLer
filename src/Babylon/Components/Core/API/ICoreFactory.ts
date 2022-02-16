import ICore from "./ICore";

export default interface ICoreFactory {
  createCore(): ICore;
}
