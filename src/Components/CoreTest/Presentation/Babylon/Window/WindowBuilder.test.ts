import WindowBuilder from "../../../../Core/Presentation/Babylon/Window/WindowBuilder";
import PresentationBuilder from "../../../../Core/Presentation/PresentationBuilder/PresentationBuilder";

describe("WindowBuilder", () => {
  let systemUnderTest: WindowBuilder;

  beforeEach(() => {
    systemUnderTest = new WindowBuilder();
  });

  test("constructor", () => {
    expect(systemUnderTest).toBeInstanceOf(PresentationBuilder);
  });
});
