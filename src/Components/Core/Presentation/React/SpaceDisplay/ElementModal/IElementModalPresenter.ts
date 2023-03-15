import ElementTO from "src/Components/Core/Application/DataTransferObjects/ElementTO";
import IWorldAdapter from "src/Components/Core/Application/Ports/WorldPort/IWorldAdapter";

export default interface IElementModalPresenter extends IWorldAdapter {
  onElementLoaded(elementTO: ElementTO): void;
}
