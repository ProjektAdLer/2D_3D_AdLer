// Small Break alles außer H und S
// Small Break B3
import SmallBreakB3Slide1Image from "../../../../Assets/BreakTimeAssets/B3/ps-B3-slide1.png";
import SmallBreakB3Slide2Image from "../../../../Assets/BreakTimeAssets/B3/smallBreakContent-B3-slide2.png";
// Small Break B7
import SmallBreakB7Slide1Image from "../../../../Assets/BreakTimeAssets/B7/smallBreakContent-B7-slide1.png";
import SmallBreakB7Slide2Image from "../../../../Assets/BreakTimeAssets/B7/smallBreakContent-B7-slide2.png";
// Small Break B8
import SmallBreakB8Slide1Image from "../../../../Assets/BreakTimeAssets/B8/smallBreakContent-B8-slide1.png";
import SmallBreakB8Slide2Image from "../../../../Assets/BreakTimeAssets/B8/smallBreakContent-B8-slide2.png";
// Small Break E2
import SmallBreakE2Slide1Image from "../../../../Assets/BreakTimeAssets/E2/smallBreakContent-E2-slide1.png";
import SmallBreakE2Slide2Image from "../../../../Assets/BreakTimeAssets/E2/smallBreakContent-E2-slide2.png";
import SmallBreakE2Slide3Image from "../../../../Assets/BreakTimeAssets/E2/smallBreakContent-E2-slide3.png";
// Small Break E4
import SmallBreakE4Slide1Image from "../../../../Assets/BreakTimeAssets/E4/smallBreakContent-E4-slide1.png";
// Small Break E10
import SmallBreakE10Slide1Image from "../../../../Assets/BreakTimeAssets/E10/smallBreakContent-E10-slide1.png";
import SmallBreakE10Slide2Image from "../../../../Assets/BreakTimeAssets/E10/smallBreakContent-E10-slide2.png";
// Small Break L1
import SmallBreakL1Slide1Image from "../../../../Assets/BreakTimeAssets/L1/smallBreakContent-L1-slide1.png";
import SmallBreakL1Slide2Image from "../../../../Assets/BreakTimeAssets/L1/smallBreakContent-L1-slide2.png";
import SmallBreakL1Slide3Image from "../../../../Assets/BreakTimeAssets/L1/smallBreakContent-L1-slide3.png";
// Small Break L3
import SmallBreakL3Slide1Image from "../../../../Assets/BreakTimeAssets/L3/smallBreakContent-L3-slide1.png";
import SmallBreakL3Slide2Image from "../../../../Assets/BreakTimeAssets/L3/smallBreakContent-L3-slide2.png";
// Small Break L5
import SmallBreakL5Slide1Image from "../../../../Assets/BreakTimeAssets/L5/smallBreakContent-L5-slide1.png";
import SmallBreakL5Slide2Image from "../../../../Assets/BreakTimeAssets/L5/smallBreakContent-L5-slide2.png";
// Small Break U3
import SmallBreakU3Slide1Image from "../../../../Assets/BreakTimeAssets/U3/smallBreakContent-U3-slide1.png";
import SmallBreakU3Slide2Image from "../../../../Assets/BreakTimeAssets/U3/smallBreakContent-U3-slide2.png";
import SmallBreakU3Slide3Image from "../../../../Assets/BreakTimeAssets/U3/smallBreakContent-U3-slide3.png";
import SmallBreakU3Slide4Image from "../../../../Assets/BreakTimeAssets/U3/smallBreakContent-U3-slide4.png";
// Medium Break = S
// Medium Break S1
import MediumBreakS1Slide1Image from "../../../../Assets/BreakTimeAssets/S1/mediumBreakContent-S1-slide1.png";
import MediumBreakS1Slide2Image from "../../../../Assets/BreakTimeAssets/S1/mediumBreakContent-S1-slide2.png";
import MediumBreakS1Slide3Image from "../../../../Assets/BreakTimeAssets/S1/mediumBreakContent-S1-slide3.png";
import MediumBreakS1Slide4Image from "../../../../Assets/BreakTimeAssets/S1/mediumBreakContent-S1-slide4.png";
// Medium Break S3
import MediumBreakS3Slide1Image from "../../../../Assets/BreakTimeAssets/S3/mediumBreakContent-S3-slide1.png";
import MediumBreakS3Slide2Image from "../../../../Assets/BreakTimeAssets/S3/mediumBreakContent-S3-slide2.png";
import MediumBreakS3Slide3Image from "../../../../Assets/BreakTimeAssets/S3/mediumBreakContent-S3-slide3.png";
// Long Break = H
//Long Break H1
import LongBreakH1Slide1Image from "../../../../Assets/BreakTimeAssets/H1/longBreakContent-H1-slide1.png";
import LongBreakH1Slide2Image from "../../../../Assets/BreakTimeAssets/H1/longBreakContent-H1-slide2.png";
import LongBreakH1Slide3Image from "../../../../Assets/BreakTimeAssets/H1/longBreakContent-H1-slide3.png";

import IBreakTimeNotification from "./IBreakTimeNotification";

export const shortBreakTimeNotificationContents: IBreakTimeNotification[] = [
  {
    titleKey: "B3",
    titleMessageKeys: ["shortBreakBase", "infoMobilization"],
    images: [SmallBreakB3Slide1Image, SmallBreakB3Slide2Image],
    seenBefore: false,
  },
  {
    titleKey: "B7",
    titleMessageKeys: ["shortBreakBase", "infoMobilization"],
    images: [SmallBreakB7Slide1Image, SmallBreakB7Slide2Image],
    seenBefore: false,
  },
  {
    titleKey: "B8",
    titleMessageKeys: ["shortBreakBase"],
    images: [SmallBreakB8Slide1Image, SmallBreakB8Slide2Image],
    seenBefore: false,
  },
  {
    titleKey: "E2",
    titleMessageKeys: ["shortBreakBase", "infoNutrition"],
    images: [
      SmallBreakE2Slide1Image,
      SmallBreakE2Slide2Image,
      SmallBreakE2Slide3Image,
    ],
    seenBefore: false,
  },
  {
    titleKey: "E4",
    titleMessageKeys: ["shortBreakBase"],
    images: [SmallBreakE4Slide1Image],
    seenBefore: false,
  },
  {
    titleKey: "E10",
    titleMessageKeys: ["shortBreakBase", "infoNutrition"],
    images: [SmallBreakE10Slide1Image, SmallBreakE10Slide2Image],
    seenBefore: false,
  },
  {
    titleKey: "L1",
    titleMessageKeys: ["shortBreakBase"],
    images: [
      SmallBreakL1Slide1Image,
      SmallBreakL1Slide2Image,
      SmallBreakL1Slide3Image,
    ],
    seenBefore: false,
  },
  {
    titleKey: "L3",
    titleMessageKeys: ["shortBreakBase"],
    images: [SmallBreakL3Slide1Image, SmallBreakL3Slide2Image],
    seenBefore: false,
  },
  {
    titleKey: "L5",
    titleMessageKeys: ["shortBreakBase"],
    images: [SmallBreakL5Slide1Image, SmallBreakL5Slide2Image],
    seenBefore: false,
  },
  {
    titleKey: "U3",
    titleMessageKeys: ["shortBreakBase", "infoSeatingPosition"],
    images: [
      SmallBreakU3Slide1Image,
      SmallBreakU3Slide2Image,
      SmallBreakU3Slide3Image,
      SmallBreakU3Slide4Image,
    ],
    seenBefore: false,
  },
];

export const mediumBreakTimeNotificationContents: IBreakTimeNotification[] = [
  {
    titleKey: "S1",
    titleMessageKeys: ["mediumBreakBase", "infoMusic"],
    images: [
      MediumBreakS1Slide1Image,
      MediumBreakS1Slide2Image,
      MediumBreakS1Slide3Image,
      MediumBreakS1Slide4Image,
    ],
    seenBefore: false,
  },
  {
    titleKey: "S3",
    titleMessageKeys: ["mediumBreakBase", "infoWhy"],
    images: [
      MediumBreakS3Slide1Image,
      MediumBreakS3Slide2Image,
      MediumBreakS3Slide3Image,
    ],
    seenBefore: false,
  },
];

export const longBreakTimeNotificationContents: IBreakTimeNotification[] = [
  {
    titleKey: "H1",
    titleMessageKeys: ["longBreakBase", "infoStroll"],
    images: [
      LongBreakH1Slide1Image,
      LongBreakH1Slide2Image,
      LongBreakH1Slide3Image,
    ],
    seenBefore: false,
  },
];
