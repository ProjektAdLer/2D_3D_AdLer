import PresentationDirector from "../../../Core/Presentation/PresentationBuilder/PresentationDirector";
import TestBuilder from "./TestBuilder";

jest.mock("./TestBuilder");

describe("PresentationDirector", () => {
  let director: PresentationDirector;

  beforeEach(() => {
    director = new PresentationDirector();
  });

  test("build calls all build steps", () => {
    let builder = new TestBuilder();
    director.build(builder);
    expect(builder.reset).toHaveBeenCalledTimes(1);
    expect(builder.buildViewModel).toHaveBeenCalledTimes(1);
    expect(builder.buildController).toHaveBeenCalledTimes(1);
    expect(builder.buildView).toHaveBeenCalledTimes(1);
    expect(builder.buildPresenter).toHaveBeenCalledTimes(1);
  });
});
