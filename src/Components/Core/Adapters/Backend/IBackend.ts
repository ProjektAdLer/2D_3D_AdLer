import { APIWorldTo } from "./APIWorldTO";

export interface IBackend {
  getWorld(): Promise<APIWorldTo>; // Promise<IWorld>
}
