import { injectable } from "inversify";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import ICalculateSpaceAvailabilityUseCase from "./ICalculateSpaceAvailabilityUseCase";

@injectable()
export default class CalculateSpaceAvailabilityUseCase
  implements ICalculateSpaceAvailabilityUseCase
{
  internalExecute(spaceID: ComponentID): boolean {
    throw new Error("Method not implemented.");
  }
}
