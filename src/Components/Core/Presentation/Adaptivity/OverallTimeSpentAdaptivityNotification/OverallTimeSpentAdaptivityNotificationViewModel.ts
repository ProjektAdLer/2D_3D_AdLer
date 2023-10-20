import Observable from "../../../../../Lib/Observable";
import { OverallTimeSpentAdaptivityNotificationBreakType } from "src/Components/Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import adaptivityPlaceholderImage from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/pausenhinweis1-slide1_AD_ohneAnschnitt.png";

export default class OverallTimeSpentAdaptivityNotificationViewModel {
  showModal: Observable<boolean> = new Observable<boolean>(false);
  showMinimizedModal: Observable<boolean> = new Observable<boolean>(false);
  breakType: Observable<OverallTimeSpentAdaptivityNotificationBreakType> =
    new Observable<OverallTimeSpentAdaptivityNotificationBreakType>(
      OverallTimeSpentAdaptivityNotificationBreakType.Short
    );

  //shortBreakContentPool structure: title, content, source
  shortBreakContentPool: [string, string, string][] = [
    // [
    //   "Why not play a game of AoE2?",
    //   "Here are a bunch of reasons why playing right now is a good idea. \n Reason 1. \n Reason 2. \n Reason 3.",
    //   "https://media.tenor.com/xTyVDYFg_fsAAAAC/lizard-hehe.gif",
    // ],
    // ["title2", "Content2", ""],
    ["", "", adaptivityPlaceholderImage],
  ];

  //mediumBreakContentPool structure: title, content, source
  mediumBreakContentPool: [string, string, string][] = [
    ["title1", "Content1", "Source1"],
    ["title2", "Content2", "Source2"],
  ];

  //longBreakContentPool structure: title, content, source
  longBreakContentPool: [string, string, string][] = [
    ["title1", "Content1", "Source1"],
    ["title2", "Content2", "Source2"],
  ];
}
