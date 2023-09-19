import BackendAdapterUtils from "../../../Core/Adapters/BackendAdapter/BackendAdapterUtils";
import { APISpace } from "../../../Core/Adapters/BackendAdapter/Types/AWT";
import BackendElementTO from "../../../Core/Application/DataTransferObjects/BackendElementTO";
import { LearningElementModelTypeEnums } from "../../../Core/Domain/LearningElementModels/LearningElementModelTypes";

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
    const inputElements: BackendElementTO[] = [
      {
        id: 1,
        name: "test",
        description: "test",
        goals: ["test"],
        model: LearningElementModelTypeEnums.NoElementModelTypes.None,
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
    expect(result[0].model).toBe(
      LearningElementModelTypeEnums.H5pElementModelTypes.Blackboard
    );
  });

  test("mapElements return an element with NoElementModelTypes.None if the modelname is invalid", () => {
    const result = BackendAdapterUtils["mapElements"]([
      {
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
    expect(result[0].model).toBe(
      LearningElementModelTypeEnums.NoElementModelTypes.None
    );
  });
});
