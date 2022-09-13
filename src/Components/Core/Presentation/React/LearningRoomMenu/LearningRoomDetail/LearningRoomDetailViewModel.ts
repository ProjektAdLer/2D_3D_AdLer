import Observable from "src/Lib/Observable";
import {
  LearningElementTypes,
  LearningElementTypeStrings,
} from "../../../Babylon/LearningElement/Types/LearningElementTypes";

export default class LearningRoomDetailViewModel {
  // TODO: remove default values when they are set from real data
  name: Observable<string> = new Observable<string>("NAME");
  description: Observable<string> = new Observable<string>(
    "Lorem ipsum sit dolor amet"
  );
  requirements: Observable<[boolean, string][]> = new Observable<
    [boolean, string][]
  >([
    [true, "Abgeschlossene Bedingung"],
    [false, "Offene Bedingung"],
  ]);
  conditions: Observable<[boolean, string][]> = new Observable<
    [boolean, string][]
  >([
    [true, "Abgeschlossene Bedingung"],
    [false, "Offene Bedingung"],
  ]);
  learningElements: Observable<[LearningElementTypeStrings, string][]> =
    new Observable<[LearningElementTypeStrings, string][]>([
      [LearningElementTypes.h5p, "H5P Lernelement"],
      [LearningElementTypes.video, "Video Lernelement"],
      [LearningElementTypes.text, "Text Lernelement"],
      [LearningElementTypes.image, "Bild Lernelement"],
    ]);
}
