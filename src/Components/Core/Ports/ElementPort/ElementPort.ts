import { injectable } from "inversify";
import IElementPort from "./IElementPort";
import IElementPresenter from "../../Presentation/Babylon/Elements/IElementPresenter";
import IElementModalPresenter from "../../Presentation/React/SpaceDisplay/ElementModal/IElementModalPresenter";
import { logger } from "src/Lib/Logger";
import ElementTO from "../../Application/DataTransferObjects/ElementTO";

@injectable()
export default class ElementPort implements IElementPort {
  private elementPresenters: IElementPresenter[] = [];
  private modalPresenter: IElementModalPresenter;

  addElementPresenter(elementPresenter: IElementPresenter): void {
    if (this.elementPresenters.includes(elementPresenter))
      throw new Error("Presenter already added.");

    this.elementPresenters.push(elementPresenter);
  }

  startElementEditing(elementStartedTO: ElementTO): void {
    if (!this.modalPresenter) {
      throw new Error("ElementModalPresenter is not registered.");
    }
    this.modalPresenter.presentElementModal(elementStartedTO);
  }

  registerModalPresenter(modalPresenter: IElementModalPresenter): void {
    if (this.modalPresenter)
      logger.warn("ElementModalPresenter is already registered.");
    this.modalPresenter = modalPresenter;
  }
}
