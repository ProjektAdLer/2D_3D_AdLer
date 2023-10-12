import { AdaptivityElementTriggerConditionTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementTriggerConditionTypes";
import { AdaptivityElementTriggerTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementTriggerTypes";
import AdaptivityElementActionTO from "./AdaptivityElementActionTO";

export default class AdaptivityElementTriggerTO {
  triggerId: number;
  triggerType: AdaptivityElementTriggerTypes;
  triggerCondition: AdaptivityElementTriggerConditionTypes;
  triggerAction: AdaptivityElementActionTO;
}
