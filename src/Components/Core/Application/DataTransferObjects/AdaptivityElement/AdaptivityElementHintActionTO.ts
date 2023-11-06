import { AdaptivityElementActionTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementActionTypes";

// similar structure as AdaptivityElementViewModel
export default class AdaptivityElementHintActionTO {
  hintActionType: AdaptivityElementActionTypes;
  idData?: number;
  textData?: string;
}
