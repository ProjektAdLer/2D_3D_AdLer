import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import AdaptivityElementTaskTO from "./AdaptivityElementTaskTO";
import { LearningElementModel } from "src/Components/Core/Domain/LearningElementModels/LearningElementModelTypes";

export class AdaptivityElementDataTO {
  id: ComponentID;
  elementName: string;
  introText: string;
  model: LearningElementModel;
  tasks: AdaptivityElementTaskTO[];
}
