import Observable from "../../../../../Lib/Observable";
import { BreakTimeNotificationType } from "src/Components/Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";
// Small Break alles außer H und S
// Small Break B3
import SmallBreakB3Slide1Image from "../../../../../Assets/BreakTimeAssets/B3/smallBreakContent-B3-slide1.png";
import SmallBreakB3Slide2Image from "../../../../../Assets/BreakTimeAssets/B3/smallBreakContent-B3-slide2.png";
// Small Break B7
import SmallBreakB7Slide1Image from "../../../../../Assets/BreakTimeAssets/B7/smallBreakContent-B7-slide1.png";
import SmallBreakB7Slide2Image from "../../../../../Assets/BreakTimeAssets/B7/smallBreakContent-B7-slide2.png";
// Small Break B8
import SmallBreakB8Slide1Image from "../../../../../Assets/BreakTimeAssets/B8/smallBreakContent-B8-slide1.png";
import SmallBreakB8Slide2Image from "../../../../../Assets/BreakTimeAssets/B8/smallBreakContent-B8-slide2.png";
// Small Break E2
import SmallBreakE2Slide1Image from "../../../../../Assets/BreakTimeAssets/E2/smallBreakContent-E2-slide1.png";
import SmallBreakE2Slide2Image from "../../../../../Assets/BreakTimeAssets/E2/smallBreakContent-E2-slide2.png";
import SmallBreakE2Slide3Image from "../../../../../Assets/BreakTimeAssets/E2/smallBreakContent-E2-slide3.png";
// Small Break E4
import SmallBreakE4Slide1Image from "../../../../../Assets/BreakTimeAssets/E4/smallBreakContent-E4-slide1.png";
// Small Break E10
import SmallBreakE10Slide1Image from "../../../../../Assets/BreakTimeAssets/E10/smallBreakContent-E10-slide1.png";
import SmallBreakE10Slide2Image from "../../../../../Assets/BreakTimeAssets/E10/smallBreakContent-E10-slide2.png";
// Small Break L1
import SmallBreakL1Slide1Image from "../../../../../Assets/BreakTimeAssets/L1/smallBreakContent-L1-slide1.png";
import SmallBreakL1Slide2Image from "../../../../../Assets/BreakTimeAssets/L1/smallBreakContent-L1-slide2.png";
import SmallBreakL1Slide3Image from "../../../../../Assets/BreakTimeAssets/L1/smallBreakContent-L1-slide3.png";
// Small Break L3
import SmallBreakL3Slide1Image from "../../../../../Assets/BreakTimeAssets/L3/smallBreakContent-L3-slide1.png";
import SmallBreakL3Slide2Image from "../../../../../Assets/BreakTimeAssets/L3/smallBreakContent-L3-slide2.png";
// Small Break L5
import SmallBreakL5Slide1Image from "../../../../../Assets/BreakTimeAssets/L5/smallBreakContent-L5-slide1.png";
import SmallBreakL5Slide2Image from "../../../../../Assets/BreakTimeAssets/L5/smallBreakContent-L5-slide2.png";
// Small Break U3
import SmallBreakU3Slide1Image from "../../../../../Assets/BreakTimeAssets/U3/smallBreakContent-U3-slide1.png";
import SmallBreakU3Slide2Image from "../../../../../Assets/BreakTimeAssets/U3/smallBreakContent-U3-slide2.png";
import SmallBreakU3Slide3Image from "../../../../../Assets/BreakTimeAssets/U3/smallBreakContent-U3-slide3.png";
import SmallBreakU3Slide4Image from "../../../../../Assets/BreakTimeAssets/U3/smallBreakContent-U3-slide4.png";
// Medium Break = S
// Medium Break S1
import MediumBreakS1Slide1Image from "../../../../../Assets/BreakTimeAssets/S1/mediumBreakContent-S1-slide1.png";
import MediumBreakS1Slide2Image from "../../../../../Assets/BreakTimeAssets/S1/mediumBreakContent-S1-slide2.png";
import MediumBreakS1Slide3Image from "../../../../../Assets/BreakTimeAssets/S1/mediumBreakContent-S1-slide3.png";
import MediumBreakS1Slide4Image from "../../../../../Assets/BreakTimeAssets/S1/mediumBreakContent-S1-slide4.png";
// Medium Break S3
import MediumBreakS3Slide1Image from "../../../../../Assets/BreakTimeAssets/S3/mediumBreakContent-S3-slide1.png";
import MediumBreakS3Slide2Image from "../../../../../Assets/BreakTimeAssets/S3/mediumBreakContent-S3-slide2.png";
import MediumBreakS3Slide3Image from "../../../../../Assets/BreakTimeAssets/S3/mediumBreakContent-S3-slide3.png";
// Long Break = H
//Long Break H1
import LongBreakH1Slide1Image from "../../../../../Assets/BreakTimeAssets/H1/longBreakContent-H1-slide1.png";
import LongBreakH1Slide2Image from "../../../../../Assets/BreakTimeAssets/H1/longBreakContent-H1-slide2.png";
import LongBreakH1Slide3Image from "../../../../../Assets/BreakTimeAssets/H1/longBreakContent-H1-slide3.png";

export type breakObject = {
  titleMessageKeys: string[]; // keys reference strings inside localize language package
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  seenBefore: boolean;
};
export default class BreakTimeNotificationViewModel {
  showModal: Observable<boolean> = new Observable<boolean>(false);
  showMinimizedModal: Observable<boolean> = new Observable<boolean>(false);
  breakType: Observable<BreakTimeNotificationType> =
    new Observable<BreakTimeNotificationType>(BreakTimeNotificationType.Short);
  slideIndex: Observable<number> = new Observable<number>(1);
  shortBreakContentPool: breakObject[] = [
    {
      titleMessageKeys: ["shortBreakBase", "infoMobilization"],
      image1: SmallBreakB3Slide1Image,
      image2: SmallBreakB3Slide2Image,
      image3: "",
      image4: "",
      seenBefore: false,
    },
    {
      titleMessageKeys: ["shortBreakBase", "infoMobilization"],
      image1: SmallBreakB7Slide1Image,
      image2: SmallBreakB7Slide2Image,
      image3: "",
      image4: "",
      seenBefore: false,
    },
    {
      titleMessageKeys: ["shortBreakBase"],
      image1: SmallBreakB8Slide1Image,
      image2: SmallBreakB8Slide2Image,
      image3: "",
      image4: "",
      seenBefore: false,
    },
    {
      titleMessageKeys: ["shortBreakBase", "infoNutrition"],
      image1: SmallBreakE2Slide1Image,
      image2: SmallBreakE2Slide2Image,
      image3: SmallBreakE2Slide3Image,
      image4: "",
      seenBefore: false,
    },
    {
      titleMessageKeys: ["shortBreakBase"],
      image1: SmallBreakE4Slide1Image,
      image2: "",
      image3: "",
      image4: "",
      seenBefore: false,
    },
    {
      titleMessageKeys: ["shortBreakBase", "infoNutrition"],
      image1: SmallBreakE10Slide1Image,
      image2: SmallBreakE10Slide2Image,
      image3: "",
      image4: "",
      seenBefore: false,
    },
    {
      titleMessageKeys: ["shortBreakBase"],
      image1: SmallBreakL1Slide1Image,
      image2: SmallBreakL1Slide2Image,
      image3: SmallBreakL1Slide3Image,
      image4: "",
      seenBefore: false,
    },
    {
      titleMessageKeys: ["shortBreakBase"],
      image1: SmallBreakL3Slide1Image,
      image2: SmallBreakL3Slide2Image,
      image3: "",
      image4: "",
      seenBefore: false,
    },
    {
      titleMessageKeys: ["shortBreakBase"],
      image1: SmallBreakL5Slide1Image,
      image2: SmallBreakL5Slide2Image,
      image3: "",
      image4: "",
      seenBefore: false,
    },
    {
      titleMessageKeys: ["shortBreakBase", "infoSeatingPosition"],
      image1: SmallBreakU3Slide1Image,
      image2: SmallBreakU3Slide2Image,
      image3: SmallBreakU3Slide3Image,
      image4: SmallBreakU3Slide4Image,
      seenBefore: false,
    },
  ];

  //mediumBreakContentPool structure: title, content, source
  mediumBreakContentPool: breakObject[] = [
    {
      titleMessageKeys: ["mediumBreakBase", "infoMusic"],
      image1: MediumBreakS1Slide1Image,
      image2: MediumBreakS1Slide2Image,
      image3: MediumBreakS1Slide3Image,
      image4: MediumBreakS1Slide4Image,
      seenBefore: false,
    },
    {
      titleMessageKeys: ["mediumBreakBase", "infoWhy"],
      image1: MediumBreakS3Slide1Image,
      image2: MediumBreakS3Slide2Image,
      image3: MediumBreakS3Slide3Image,
      image4: "",
      seenBefore: false,
    },
  ];

  //longBreakContentPool structure: title, content, source
  longBreakContentPool: breakObject[] = [
    {
      titleMessageKeys: ["longBreakBase", "infoStroll"],
      image1: LongBreakH1Slide1Image,
      image2: LongBreakH1Slide2Image,
      image3: LongBreakH1Slide3Image,
      image4: "",
      seenBefore: false,
    },
  ];
}
