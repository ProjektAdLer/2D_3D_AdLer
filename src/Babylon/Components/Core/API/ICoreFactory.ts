import ICore from "./ICore";

export default interface ICoreFactory {
  CreateCore(): ICore;
}
