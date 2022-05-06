import PresentationDirector from "../../../Core/Presentation/PresentationBuilder/PresentationDirector";
import TestBuilder from "./TestBuilder";

jest.mock("./TestBuilder");

describe("PresentationDirector", () => {
  let director: PresentationDirector;

  beforeEach(() => {
    director = new PresentationDirector();
  });

  test("Builder setter", () => {
    expect(director["builder"]).toBeUndefined();
    let builder = new TestBuilder();
    director.Builder = builder;
    expect(director["builder"]).toBe(builder);
  });

  test("build calls all build steps", () => {
    let builder = new TestBuilder();
    director.Builder = builder;
    director.build();
    expect(builder.reset).toHaveBeenCalledTimes(1);
    expect(builder.buildViewModel).toHaveBeenCalledTimes(1);
    expect(builder.buildController).toHaveBeenCalledTimes(1);
    expect(builder.buildView).toHaveBeenCalledTimes(1);
    expect(builder.buildPresenter).toHaveBeenCalledTimes(1);
  });

  test("build throws error if builder is not set", () => {
    expect(() => {
      director.build();
    }).toThrowError("PresentationBuilder is not set");
  });
});
