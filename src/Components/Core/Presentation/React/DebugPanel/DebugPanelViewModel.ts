import Observable from "../../../../../Lib/Observable";

export type MiscEntries = {
  key: string;
  value: string;
}[];

export default class DebugPanelViewModel {
  moodleToken = new Observable<string>("", true);
  misc = new Observable<MiscEntries>([], true);
}
