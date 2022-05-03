import { IDTO } from "./IDTO";
export interface IAsyncUsecase {
  executeAsync(data?: IDTO): Promise<void>;
}
