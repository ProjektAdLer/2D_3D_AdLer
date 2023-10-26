import Observable from "../../../../../Lib/Observable";
import { OverallTimeSpentAdaptivityNotificationBreakType } from "src/Components/Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
// Small Break alles außer H und S
// Small Break L1
import SmallBreakL1Slide1Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/L1/smallBreakContent-L1-slide1.png";
import SmallBreakL1Slide2Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/L1/smallBreakContent-L1-slide2.png";
import SmallBreakL1Slide3Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/L1/smallBreakContent-L1-slide3.png";
// Small Break B8
import SmallBreakB8Slide1Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/B8/smallBreakContent-B8-slide1.png";
import SmallBreakB8Slide2Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/B8/smallBreakContent-B8-slide2.png";
// Small Break E2
import SmallBreakE2Slide1Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/E2/smallBreakContent-E2-slide1.png";
import SmallBreakE2Slide2Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/E2/smallBreakContent-E2-slide2.png";
import SmallBreakE2Slide3Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/E2/smallBreakContent-E2-slide3.png";
// Small Break E4
import SmallBreakE4Slide1Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/E4/smallBreakContent-E4-slide1.png";
// Small Break E10
import SmallBreakE10Slide1Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/E10/smallBreakContent-E10-slide1.png";
import SmallBreakE10Slide2Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/E10/smallBreakContent-E10-slide2.png";
// Small Break L5
import SmallBreakL5Slide1Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/L5/smallBreakContent-L5-slide1.png";
import SmallBreakL5Slide2Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/L5/smallBreakContent-L5-slide2.png";
// Small Break U3
import SmallBreakU3Slide1Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/U3/smallBreakContent-U3-slide1.png";
import SmallBreakU3Slide2Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/U3/smallBreakContent-U3-slide2.png";
import SmallBreakU3Slide3Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/U3/smallBreakContent-U3-slide3.png";
import SmallBreakU3Slide4Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/U3/smallBreakContent-U3-slide4.png";
// Medium Break = S
// Medium Break S1
import MediumBreak1Slide1Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/S1/mediumBreakContent-S1-slide1.png";
import MediumBreak1Slide2Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/S1/mediumBreakContent-S1-slide2.png";
import MediumBreak1Slide3Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/S1/mediumBreakContent-S1-slide3.png";
// Long Break = H
export default class OverallTimeSpentAdaptivityNotificationViewModel {
  showModal: Observable<boolean> = new Observable<boolean>(false);
  showMinimizedModal: Observable<boolean> = new Observable<boolean>(false);
  breakType: Observable<OverallTimeSpentAdaptivityNotificationBreakType> =
    new Observable<OverallTimeSpentAdaptivityNotificationBreakType>(
      OverallTimeSpentAdaptivityNotificationBreakType.Short
    );

  //shortBreakContentPool structure: title, imageContent, imageContent, imageContent, imageContent
  shortBreakContentPool: [string, string, string, string, string][] = [
    // [
    //   "Why not play a game of AoE2?",
    //   "Here are a bunch of reasons why playing right now is a good idea. \n Reason 1. \n Reason 2. \n Reason 3.",
    //   "https://media.tenor.com/xTyVDYFg_fsAAAAC/lizard-hehe.gif",
    // ],
    // ["title2", "Content2", ""],
    [
      "Sie haben nun 30 Minuten am Stück mit AdLer gelernt. Wie wäre es denn mit einer 5-minütigen Pause?",
      SmallBreakL1Slide1Image,
      SmallBreakL1Slide2Image,
      SmallBreakL1Slide3Image,
      "",
    ],
    [
      "Sie haben nun 30 Minuten am Stück mit AdLer gelernt. Wie wäre es denn mit einer 5-minütigen Pause?",
      SmallBreakB8Slide1Image,
      SmallBreakB8Slide2Image,
      "",
      "",
    ],
    [
      "Sie haben nun 30 Minuten am Stück mit AdLer gelernt. Wie wäre es denn mit einer 5-minütigen Pause? Vielleicht interessiert Sie in dem Zusammenhang auch, dass auch die Ernährung für das Lernen wichtig ist.",
      SmallBreakE2Slide1Image,
      SmallBreakE2Slide2Image,
      SmallBreakE2Slide3Image,
      "",
    ],
    [
      "Sie haben nun 30 Minuten am Stück mit AdLer gelernt. Wie wäre es denn mit einer 5-minütigen Pause?",
      SmallBreakE4Slide1Image,
      "",
      "",
      "",
    ],
    [
      "Sie haben nun 30 Minuten am Stück mit AdLer gelernt. Wie wäre es denn mit einer 5-minütigen Pause? Vielleicht interessiert Sie in dem Zusammenhang auch, dass auch die Ernährung für das Lernen wichtig ist.",
      SmallBreakE10Slide1Image,
      SmallBreakE10Slide2Image,
      "",
      "",
    ],
    [
      "Sie haben nun 30 Minuten am Stück mit AdLer gelernt. Wie wäre es denn mit einer 5-minütigen Pause?",
      SmallBreakL5Slide1Image,
      SmallBreakL5Slide2Image,
      "",
      "",
    ],
    [
      "Sie haben nun 30 Minuten am Stück mit AdLer gelernt. Wie wäre es denn mit einer 5-minütigen Pause? Vielleicht interessiert Sie in dem Zusammenhang auch, dass eine richtige Sitzhaltung und ein optimaler Abstand zum Bildschirm für das Lernen wichtig ist.",
      SmallBreakU3Slide1Image,
      SmallBreakU3Slide2Image,
      SmallBreakU3Slide3Image,
      SmallBreakU3Slide3Image,
    ],
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
