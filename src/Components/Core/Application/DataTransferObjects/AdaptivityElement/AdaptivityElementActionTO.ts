import { AdaptivityElementActionTypes } from "../../../Domain/Types/Adaptivity/AdaptivityElementActionTypes";
export default class AdaptivityElementActionTO {
  actionType: AdaptivityElementActionTypes;
  idData?: number;
  textData?: string;
}
