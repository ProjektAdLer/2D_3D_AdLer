import { AdaptivityElementDataTO } from "./AdaptivityElementDataTO";
import AdaptivityElementTaskProgressTO from "./AdaptivityElementTaskProgressTO";

export default class AdaptivityElementProgressTO extends AdaptivityElementDataTO {
  isCompleted: boolean;
  override tasks: AdaptivityElementTaskProgressTO[];
}
