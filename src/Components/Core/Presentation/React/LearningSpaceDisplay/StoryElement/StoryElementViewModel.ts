import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import Observable from "../../../../../../Lib/Observable";

export default class StoryElementViewModel {
  texts: Observable<string[]> = new Observable<string[]>([]);
  isOpen: Observable<boolean> = new Observable<boolean>(false);
  type: Observable<StoryElementType> = new Observable<StoryElementType>();
  pageId: Observable<number> = new Observable<number>(0);
}
