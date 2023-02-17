import BackendAdapterUtils from "../../../Core/Adapters/BackendAdapter/BackendAdapterUtils";

describe("BackendAdapterUtils", () => {
  test("mapElements returns empty array if given element type is not supported", () => {
    const result = BackendAdapterUtils["mapElements"]([
      {
        id: 1,
        identifier: { type: "FileName", value: "test" },
        description: "test",
        goals: "test",
        elementCategory: "test",
        learningSpaceParentID: 1,
        learningElementValueList: [{ type: "test", value: "test" }],
      },
    ]);
    expect(result).toHaveLength(0);
  });
});
