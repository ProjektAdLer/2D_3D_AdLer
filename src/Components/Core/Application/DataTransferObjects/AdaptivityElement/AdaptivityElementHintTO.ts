import { AdaptivityHintAction } from "src/Components/Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementViewModel";

// similar structure as in AdaptivityElementViewModel
export default class AdaptivityElementHintTO {
  hintID: number;
  showOnIsWrong: boolean;
  hintAction: AdaptivityHintAction;
}
