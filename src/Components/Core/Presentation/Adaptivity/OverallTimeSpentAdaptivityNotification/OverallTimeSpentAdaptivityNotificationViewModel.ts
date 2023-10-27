import Observable from "../../../../../Lib/Observable";
import { OverallTimeSpentAdaptivityNotificationBreakType } from "src/Components/Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
// Small Break alles außer H und S
// Small Break B3
import SmallBreakB3Slide1Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/B3/smallBreakContent-B3-slide1.png";
import SmallBreakB3Slide2Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/B3/smallBreakContent-B3-slide2.png";
// Small Break B7
import SmallBreakB7Slide1Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/B7/smallBreakContent-B7-slide1.png";
import SmallBreakB7Slide2Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/B7/smallBreakContent-B7-slide2.png";
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
// Small Break L1
import SmallBreakL1Slide1Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/L1/smallBreakContent-L1-slide1.png";
import SmallBreakL1Slide2Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/L1/smallBreakContent-L1-slide2.png";
import SmallBreakL1Slide3Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/L1/smallBreakContent-L1-slide3.png";
// Small Break L3
import SmallBreakL3Slide1Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/L3/smallBreakContent-L3-slide1.png";
import SmallBreakL3Slide2Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/L3/smallBreakContent-L3-slide2.png";
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
import MediumBreakS1Slide1Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/S1/mediumBreakContent-S1-slide1.png";
import MediumBreakS1Slide2Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/S1/mediumBreakContent-S1-slide2.png";
import MediumBreakS1Slide3Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/S1/mediumBreakContent-S1-slide3.png";
import MediumBreakS1Slide4Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/S1/mediumBreakContent-S1-slide4.png";
// Medium Break S3
import MediumBreakS3Slide1Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/S3/mediumBreakContent-S3-slide1.png";
import MediumBreakS3Slide2Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/S3/mediumBreakContent-S3-slide2.png";
import MediumBreakS3Slide3Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/S3/mediumBreakContent-S3-slide3.png";
// Long Break = H
//Long Break H1
import LongBreakH1Slide1Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/H1/longBreakContent-H1-slide1.png";
import LongBreakH1Slide2Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/H1/longBreakContent-H1-slide2.png";
import LongBreakH1Slide3Image from "../../../../../Assets/OverallTimeSpentAdaptivityAssets/H1/longBreakContent-H1-slide3.png";
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
      "Sie haben nun 30 Minuten am Stück mit AdLer gelernt. Wie wäre es denn mit einer 5-minütigen Pause? Auf dem Bild sehen Sie eine kurze Übung zur Mobilisation.",
      SmallBreakB3Slide1Image,
      SmallBreakB3Slide2Image,
      "",
      "",
    ],
    [
      "Sie haben nun 30 Minuten am Stück mit AdLer gelernt. Wie wäre es denn mit einer 5-minütigen Pause? Auf dem Bild sehen Sie eine kurze Übung zur Mobilisation.",
      SmallBreakB7Slide1Image,
      SmallBreakB7Slide2Image,
      "",
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
      SmallBreakL1Slide1Image,
      SmallBreakL1Slide2Image,
      SmallBreakL1Slide3Image,
      "",
    ],
    [
      "Sie haben nun 30 Minuten am Stück mit AdLer gelernt. Wie wäre es denn mit einer 5-minütigen Pause?",
      SmallBreakL3Slide1Image,
      SmallBreakL3Slide2Image,
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
  mediumBreakContentPool: [string, string, string, string, string][] = [
    [
      "Sie haben nun 2 Stunden am Stück im AdLer-System gelernt und gearbeitet. Wir würden Ihnen eine Pause von mindestens 20 Minuten empfehlen. Wie wäre es denn mit aktivem bzw. bewusstem Musikhören?",
      MediumBreakS1Slide1Image,
      MediumBreakS1Slide1Image,
      MediumBreakS1Slide1Image,
      MediumBreakS1Slide1Image,
    ],
    [
      "Sie haben nun 2 Stunden am Stück im AdLer-System gelernt und gearbeitet. Wir würden Ihnen eine Pause von mindestens 20 Minuten empfehlen. Warum?",
      MediumBreakS3Slide1Image,
      MediumBreakS3Slide2Image,
      MediumBreakS3Slide3Image,
      "",
    ],
  ];

  //longBreakContentPool structure: title, content, source
  longBreakContentPool: [string, string, string, string, string][] = [
    [
      "Sie haben nun 4 Stunden am Stück im AdLer-System gelernt und gearbeitet. Wir würden Ihnen eine längere Pause von mindestens 90 Minuten empfehlen. Wie wäre es denn mit einem Spaziergang?",
      LongBreakH1Slide1Image,
      LongBreakH1Slide2Image,
      LongBreakH1Slide3Image,
      "",
    ],
  ];
}
