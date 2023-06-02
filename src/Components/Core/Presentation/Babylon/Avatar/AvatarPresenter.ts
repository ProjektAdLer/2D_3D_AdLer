import { injectable } from "inversify";
import IAvatarPort from "../../../Application/Ports/Interfaces/IAvatarPort";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarPresenter from "./IAvatarPresenter";
import AvatarTO from "src/Components/Core/Application/DataTransferObjects/AvatarTO";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import LearningSpaceTemplateLookup from "src/Components/Core/Domain/LearningSpaceTemplates/LearningSpaceTemplatesLookup";
import { Vector3 } from "@babylonjs/core";

/**
 * @class AvatarPresenter
 * @description Presenter and Port for the Avatar.
 */
@injectable()
export default class AvatarPresenter
  implements IAvatarPresenter, IAvatarPort, ILearningWorldAdapter
{
  private viewModel: AvatarViewModel;

  public set ViewModel(newViewModel: AvatarViewModel) {
    this.viewModel = newViewModel;
  }

  presentAvatar(avatarTO: AvatarTO): void {}

  onLearningSpaceLoaded(learningSpaceTO: LearningSpaceTO): void {
    const templateSpawn = LearningSpaceTemplateLookup.getLearningSpaceTemplate(
      learningSpaceTO.template
    ).playerSpawnPoint;
    this.viewModel.spawnPoint.Value = new Vector3(
      templateSpawn.position.x,
      0,
      templateSpawn.position.y
    );
  }
}
