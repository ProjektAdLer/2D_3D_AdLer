import Observable from "../../../../../../Lib/Observable";

export default class LearningSpaceNamePanelViewModel {
  name = new Observable<string>();
  parentWorldName: string = "";
}
