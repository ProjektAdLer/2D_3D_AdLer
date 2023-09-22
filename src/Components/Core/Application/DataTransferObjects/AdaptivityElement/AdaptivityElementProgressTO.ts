import { AdaptivityDataTO } from "../AdaptivityDataTO";
import AdaptivityElementTaskProgressTO from "./AdaptivityElementTaskProgressTO";

export default class AdaptivityElementProgressTO extends AdaptivityDataTO {
  isCompleted: boolean;
  override tasks: AdaptivityElementTaskProgressTO[];
}
