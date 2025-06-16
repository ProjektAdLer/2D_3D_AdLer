import Observable from "../../../../../../../Lib/Observable";

export interface XPInfo {
  currentXP: number;
  currentLevel: number;
  maxLevel: number;
}

export default class ExperiencePointsPanelViewModel {
  xpInfo: Observable<XPInfo> = new Observable({
    currentXP: 0,
    currentLevel: 0,
    maxLevel: 0,
  });
}
