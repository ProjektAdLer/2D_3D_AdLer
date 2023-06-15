import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";

export default interface ILearningSpacePresenter {
  dispose(): void;
  asyncSetupSpace(spaceData: LearningSpaceTO): Promise<void>;
}
