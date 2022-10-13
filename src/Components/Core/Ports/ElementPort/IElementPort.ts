import IElementModalPresenter from "~ReactComponents/SpaceDisplay/ElementModal/IElementModalPresenter";
import ElementTO from "../../Application/DataTransferObjects/ElementTO";
import { ElementID } from "../../Domain/Types/EntityTypes";
import IElementPresenter from "../../Presentation/Babylon/Elements/IElementPresenter";

export default interface IElementPort {
  addElementPresenter(elementPresenter: IElementPresenter): void;

  startElementEditing(elementStartedTO: ElementTO): void;

  registerModalPresenter(modalPresenter: IElementModalPresenter): void;

  onElementScored(hasScored: boolean, elementID: ElementID): void;
}
