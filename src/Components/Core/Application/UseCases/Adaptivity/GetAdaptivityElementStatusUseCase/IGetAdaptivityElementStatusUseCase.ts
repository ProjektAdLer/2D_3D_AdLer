import AdaptivityElementProgressTO from "src/Components/Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import { IInternalAsyncUsecase } from "../../../Abstract/IInternalAsyncUsecase";

export default interface IGetAdaptivityElementStatusUseCase
  extends IInternalAsyncUsecase<
    AdaptivityElementProgressTO,
    AdaptivityElementProgressTO
  > {}
