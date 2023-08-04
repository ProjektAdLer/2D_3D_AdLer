import BackendAdapterUtils from "../../../Core/Adapters/BackendAdapter/BackendAdapterUtils";

describe("BackendAdapterUtils", () => {
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
