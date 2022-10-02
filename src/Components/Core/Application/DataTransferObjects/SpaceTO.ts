import { ElementID } from "../../Domain/Types/EntityTypes";
import ElementTO from "./ElementTO";

export default class SpaceTO {
  id: ElementID;
  name: string;
  // Elemente, welche in diesem Space sind
  elements: ElementTO[];
  description: string;
  goals: string;
  // Welche Räume müssen erfüllt sein, damit dieser Raum freigeschalten wird
  requirements: ElementID[];
  // Wie viele Punkte braucht der Spieler, um diesen Raum abzuschließen
  requiredPoints: number;
}
