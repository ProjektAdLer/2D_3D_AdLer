import ILearningElementModalPresenter from "~ReactComponents/LearningRoomDisplay/LearningElementModal/ILearningElementModalPresenter";
import LearningElementTO from "../../Application/DataTransportObjects/LearningElementTO";
import ILearningElementPresenter from "../../Presentation/Babylon/LearningElement/ILearningElementPresenter";

export default interface ILearningElementPort {
  addLearningElementPresenter(
    learningElementPresenter: ILearningElementPresenter
  ): void;

  startLearningElementEditing(
    learningElementStartedTO: LearningElementTO
  ): void;

  registerModalPresenter(modalPresenter: ILearningElementModalPresenter): void;
}
