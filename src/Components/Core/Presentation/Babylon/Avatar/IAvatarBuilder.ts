import IAsyncPresentationBuilder from "../../PresentationBuilder/IAsyncPresentationBuilder";
import { Transform } from "src/Components/Core/Domain/LearningSpaceTemplates/ILearningSpaceTemplate";

export default interface IAvatarBuilder extends IAsyncPresentationBuilder {
  playerSpawnPoint: Transform;
}
