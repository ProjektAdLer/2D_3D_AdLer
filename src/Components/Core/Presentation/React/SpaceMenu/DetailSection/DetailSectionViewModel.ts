import Observable from "src/Lib/Observable";
import { ElementTypeStrings } from "../../../Babylon/Elements/Types/ElementTypes";

export default class DetailSectionViewModel {
  name: Observable<string> = new Observable<string>("");
  description: Observable<string> = new Observable<string>("");
  // Eine Liste von Räumen, die der Spieler beenden muss, damit er auf diesen hier zugreifen kann
  requirements: Observable<[boolean, string][]> = new Observable<
    [boolean, string][]
  >([]);
  // Eine Liste aus den Lernenelementen, welche in einem Raum sind und deren Status
  conditions: Observable<[boolean, string][]> = new Observable<
    [boolean, string][]
  >([]);
  // Eine auflistung, welche elemente in diesen Raum vorhanden sind?
  elements: Observable<[ElementTypeStrings, string][]> = new Observable<
    [ElementTypeStrings, string][]
  >([]);
}
