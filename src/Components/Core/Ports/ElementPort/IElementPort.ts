import IElementModalPresenter from "~ReactComponents/SpaceDisplay/ElementModal/IElementModalPresenter";
import ElementTO from "../../Application/DataTransportObjects/ElementTO";
import IElementPresenter from "../../Presentation/Babylon/Elements/IElementPresenter";

export default interface IElementPort {
  addElementPresenter(elementPresenter: IElementPresenter): void;

  startElementEditing(elementStartedTO: ElementTO): void;

  registerModalPresenter(modalPresenter: IElementModalPresenter): void;
}
