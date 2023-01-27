import SpaceTO from "../../../../../../Components/Core/Application/DataTransferObjects/SpaceTO";
import Observable from "../../../../../../Lib/Observable";

export default class ExitModalViewModel {
  modalTitle = new Observable<string>("Raum verlassen?");
  exitButtonTitle = new Observable<string>("Ja");

  isOpen: Observable<boolean> = new Observable<boolean>(false);
  subsequentSpaces = new Observable<SpaceTO[]>(
    [
      {
        id: 1,
        name: "element 1",
      } as SpaceTO,
    ],
    true
  );
}
