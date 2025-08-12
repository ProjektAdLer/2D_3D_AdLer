import LearningSpaceTO from "../../../../Application/DataTransferObjects/LearningSpaceTO";
import Observable from "../../../../../../Lib/Observable";

export default class ExitModalViewModel {
  modalTitle = new Observable<string>("exitRoomTitle");
  exitButtonTitle = new Observable<string>("exitRoomButton");
  successorSpaces = new Observable<LearningSpaceTO[]>();
  precursorSpaces = new Observable<LearningSpaceTO[]>();
  availableSpaces = new Observable<LearningSpaceTO[]>();

  isOpen: Observable<boolean> = new Observable<boolean>(false);

  isExit: Observable<boolean> = new Observable<boolean>();
}
