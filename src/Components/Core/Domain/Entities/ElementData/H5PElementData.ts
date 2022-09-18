import AbstractElementData from "./AbstractElementData";

export default class H5PElementData extends AbstractElementData {
  override type = "h5p";
  contextId: number;
  fileName: string;
}
