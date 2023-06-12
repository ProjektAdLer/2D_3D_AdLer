import LearningSpaceTO from "../../../../Application/DataTransferObjects/LearningSpaceTO";
import Observable from "../../../../../../Lib/Observable";

export default class ExitModalViewModel {
  modalTitle = new Observable<string>("Raum verlassen?");
  exitButtonTitle = new Observable<string>("Raum verlassen");
  successorSpaces = new Observable<LearningSpaceTO[]>();
  precursorSpaces = new Observable<LearningSpaceTO[]>();

  isOpen: Observable<boolean> = new Observable<boolean>(false);

  isExit: Observable<boolean> = new Observable<boolean>();
}
