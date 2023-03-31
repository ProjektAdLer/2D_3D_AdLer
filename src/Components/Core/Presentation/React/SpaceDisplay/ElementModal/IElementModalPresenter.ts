import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";
import IWorldAdapter from "src/Components/Core/Application/Ports/WorldPort/IWorldAdapter";

export default interface IElementModalPresenter extends IWorldAdapter {
  onElementLoaded(elementTO: LearningElementTO): void;
}
