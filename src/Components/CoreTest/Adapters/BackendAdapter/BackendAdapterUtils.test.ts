import BackendAdapterUtils from "../../../Core/Adapters/BackendAdapter/BackendAdapterUtils";
import { APISpace } from "../../../Core/Adapters/BackendAdapter/Types/AWT";
import { BackendLearningElementTO } from "../../../Core/Application/DataTransferObjects/BackendElementTO";
import { LearningElementModelTypeEnums } from "../../../Core/Domain/LearningElementModels/LearningElementModelTypes";
import { AdaptivityElementActionTypes } from "../../../Core/Domain/Types/Adaptivity/AdaptivityElementActionTypes";

describe("BackendAdapterUtils", () => {
  test("mapSpaces ", () => {
    const inputSpaces: APISpace[] = [
      {
        spaceId: 1,
        spaceName: "test",
        spaceDescription: "test",
        spaceGoals: ["test"],
        spaceTemplate: "test",
        spaceTemplateStyle: "test",
        spaceSlotContents: [1],
        requiredPointsToComplete: 1,
        requiredSpacesToEnter: "test",
      },
    ];
    const inputElements: BackendLearningElementTO[] = [
      {
        id: 1,
        name: "test",
        description: "test",
        goals: ["test"],
        model: LearningElementModelTypeEnums.H5pElementModelTypes.Blackboard,
        type: "h5p",
        value: 1,
      },
    ];

    const result = BackendAdapterUtils["mapSpaces"](inputSpaces, inputElements);

    expect(result).toHaveLength(1);
  });

  test("mapElements returns empty array if given element type is not supported", () => {
    const result = BackendAdapterUtils["mapElements"]([
      {
        $type: "test",
        elementId: 1,
        elementName: "test",
        elementDescription: "test",
        elementGoals: ["test"],
        elementCategory: "test",
        elementFileType: "test",
        elementMaxScore: 1,
        elementModel: "",
      },
    ]);
    expect(result).toHaveLength(0);
  });

  test("mapElements return an element with given model if the modelname is valid", () => {
    const result = BackendAdapterUtils["mapElements"]([
      {
        $type: "LearningElement",
        elementId: 1,
        elementName: "test",
        elementDescription: "test",
        elementGoals: ["test"],
        elementCategory: "h5p",
        elementFileType: "test",
        elementMaxScore: 1,
        elementModel:
          LearningElementModelTypeEnums.H5pElementModelTypes.Blackboard,
      },
    ]);
    let resulting = result[0] as BackendLearningElementTO;
    expect(resulting.model).toBe(
      LearningElementModelTypeEnums.H5pElementModelTypes.Blackboard
    );
  });

  test("mapElements return an element with undefined model if the modelname is invalid", () => {
    const result = BackendAdapterUtils["mapElements"]([
      {
        $type: "LearningElement",
        elementId: 1,
        elementName: "test",
        elementDescription: "test",
        elementGoals: ["test"],
        elementCategory: "h5p",
        elementFileType: "test",
        elementMaxScore: 1,
        elementModel: "invalid",
      },
    ]);
    let resulting = result[0] as BackendLearningElementTO;
    expect(resulting.model).toBe(undefined);
  });

  test.each([
    ["CommentAction", AdaptivityElementActionTypes.CommentAction],
    ["AdaptivityReferenceAction", AdaptivityElementActionTypes.ReferenceAction],
    [
      "AdaptivityContentReferenceAction",
      AdaptivityElementActionTypes.ContentAction,
    ],
  ])(
    "mapAdaptivityElementAction, when given type %s, returns an action TO with type %s",
    (backendTypeInput, expectedResult) => {
      const result = BackendAdapterUtils["mapAdaptivityAction"]({
        $type: backendTypeInput,
      });
      expect(result.actionType).toBe(expectedResult);
    }
  );
});
