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
});
