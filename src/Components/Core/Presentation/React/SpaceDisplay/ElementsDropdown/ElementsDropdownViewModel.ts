import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";
import Observable from "../../../../../../Lib/Observable";

export default class ElementsDropdownViewModel {
  elementNames = new Observable<string[]>(["element 1", "element 2"], true);
  elements = new Observable<LearningElementTO[]>(
    [
      {
        id: 1,
        value: 1,
        parentSpaceID: 1,
        parentWorldID: 1,
        name: "element 1",
        description: "description 1",
        goals: ["goals 1"],
        type: "h5p",
        hasScored: false,
      } as LearningElementTO,
      {
        id: 2,
        value: 2,
        parentSpaceID: 2,
        parentWorldID: 2,
        name: "element 2",
        description: "description 2",
        goals: ["goals 2"],
        type: "text",
        hasScored: false,
      } as LearningElementTO,
    ],
    true
  );
}
