import AbstractLearningElement from "./AbstractLearningElement";

export default class extends AbstractLearningElement {
  override type = "h5p";
  contextId: number;
  fileName: string;
}
