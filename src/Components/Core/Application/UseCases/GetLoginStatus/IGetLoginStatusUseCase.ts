import { IInternalSynchronousUsecase } from "../../Abstract/IInternalSynchronousUsecase";
import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";
import LoginStatusTO from "../../DataTransferObjects/LoginStatusTO";

export default interface IGetLoginStatusUseCase
  extends ISynchronousUsecase<void, LoginStatusTO> {}

export interface IInternalGetLoginStatusUseCase
  extends IInternalSynchronousUsecase<void, LoginStatusTO> {}
