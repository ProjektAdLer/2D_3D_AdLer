import { AdaptivityElementActionTypes } from "../../../Domain/Types/Adaptivity/AdaptivityElementActionTypes";
export default class AdaptivityElementActionTO {
  actionType: AdaptivityElementActionTypes;
  actionData: string | number;
}
