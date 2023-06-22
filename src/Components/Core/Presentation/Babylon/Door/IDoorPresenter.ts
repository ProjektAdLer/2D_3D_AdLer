import LearningSpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceScoreTO";

export default interface IDoorPresenter {
  openDoor(): void;
  onLearningSpaceScored(spaceScoreTO: LearningSpaceScoreTO): void;
}
