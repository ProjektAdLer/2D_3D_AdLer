import AbstractViewModel from "../../../Core/Presentation/Babylon/Abstract/AbstractViewModel";

class TestViewModel extends AbstractViewModel {}

describe("AbstractViewModel", () => {
  test("setIsDirtyTrue sets isDirty to true", () => {
    const systemUnderTest = new TestViewModel();
    systemUnderTest["setIsDirtyTrue"]();
    expect(systemUnderTest.isDirty).toBe(true);
  });
});
