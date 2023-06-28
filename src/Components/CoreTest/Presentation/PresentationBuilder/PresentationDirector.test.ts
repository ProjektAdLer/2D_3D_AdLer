import PresentationDirector from "../../../Core/Presentation/PresentationBuilder/PresentationDirector";
import TestBuilder, { AsyncTestBuilder } from "./TestBuilder";

describe("PresentationDirector", () => {
  let systemUnderTest: PresentationDirector;

  beforeEach(() => {
    systemUnderTest = new PresentationDirector();
  });

  test("build calls all build steps", () => {
    let builder = new TestBuilder();
    systemUnderTest.build(builder);
    expect(builder.reset).toHaveBeenCalledTimes(1);
    expect(builder.buildViewModel).toHaveBeenCalledTimes(1);
    expect(builder.buildController).toHaveBeenCalledTimes(1);
    expect(builder.buildView).toHaveBeenCalledTimes(1);
    expect(builder.buildPresenter).toHaveBeenCalledTimes(1);
  });

  test("buildAsync calls all build steps", async () => {
    let builder = new AsyncTestBuilder();
    await systemUnderTest.buildAsync(builder);
    expect(builder.reset).toHaveBeenCalledTimes(1);
    expect(builder.buildViewModel).toHaveBeenCalledTimes(1);
    expect(builder.buildController).toHaveBeenCalledTimes(1);
    expect(builder.buildView).toHaveBeenCalledTimes(1);
    expect(builder.buildPresenter).toHaveBeenCalledTimes(1);
  });
});
