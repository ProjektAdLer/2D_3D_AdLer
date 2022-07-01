import AbstractLearningElement from "./AbstractLearningElement";

export default class H5PLearningElementData extends AbstractLearningElement {
  override type = "h5p";
  contextId: number;
  fileName: string;
}
