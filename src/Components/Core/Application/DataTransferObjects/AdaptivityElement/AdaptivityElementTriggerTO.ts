import AdaptivityElementActionTO from "./AdaptivityElementActionTO";

export default class AdaptivityElementTriggerTO {
  triggerId: number;
  triggerType: string;
  triggerCondition: string;
  triggerAction: AdaptivityElementActionTO;
}
