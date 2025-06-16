import ExperiencePointsTO from "src/Components/Core/Application/DataTransferObjects/ExperiencePointsTO";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface IExperiencePointsPanelPresenter
  extends ILearningWorldAdapter {
  onExperiencePointsUpdated(experiencePointsTO: ExperiencePointsTO): void;
}
