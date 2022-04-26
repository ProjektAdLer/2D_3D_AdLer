import { IDTO } from "./IDTO";
export interface IUsecaseObserver {
  update(data: IDTO): void;
}
