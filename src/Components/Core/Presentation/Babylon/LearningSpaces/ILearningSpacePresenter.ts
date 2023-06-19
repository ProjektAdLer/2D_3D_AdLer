import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";

export default interface ILearningSpacePresenter {
  asyncSetupSpace(spaceData: LearningSpaceTO): Promise<void>;
}
