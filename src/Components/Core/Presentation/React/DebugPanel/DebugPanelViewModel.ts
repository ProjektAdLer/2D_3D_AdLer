import Observable from "../../../../../Lib/Observable";

export default class DebugPanelViewModel {
  moodleToken = new Observable<string>("", true);
}
