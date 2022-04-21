import { IDTO } from "./IDTO";
export interface ISynchronousUsecase {
  execute(data: IDTO): void;
}
