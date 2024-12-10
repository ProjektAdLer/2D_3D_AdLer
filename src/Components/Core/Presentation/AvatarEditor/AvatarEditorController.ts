import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import AvatarConfigTO from "../../Application/DataTransferObjects/AvatarConfigTO";
import IAvatarEditorController from "./IAvatarEditorController";
import IUpdateAvatarConfigUseCase from "../../Application/UseCases/UpdateAvatarConfig/IUpdateAvatarConfigUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

export default class AvatarEditorController implements IAvatarEditorController {
  onAvatarConfigChanged(changes: Partial<AvatarConfigTO>): void {
    CoreDIContainer.get<IUpdateAvatarConfigUseCase>(
      USECASE_TYPES.IUpdateAvatarConfigUseCase,
    ).executeAsync(changes);
  }
}
