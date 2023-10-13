import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import AdaptivityElementTaskTO from "./AdaptivityElementTaskTO";

export class AdaptivityElementDataTO {
  id: ComponentID;
  elementName: string;
  introText: string;
  tasks: AdaptivityElementTaskTO[];
}
