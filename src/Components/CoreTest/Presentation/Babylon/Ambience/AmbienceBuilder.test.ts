import AmbienceBuilder from "../../../../Core/Presentation/Babylon/Ambience/AmbienceBuilder";
import PresentationBuilder from "../../../../Core/Presentation/PresentationBuilder/PresentationBuilder";

describe("AmbienceBuilder", () => {
  let systemUnderTest: AmbienceBuilder;

  beforeEach(() => {
    systemUnderTest = new AmbienceBuilder();
  });

  test("constructor", () => {
    expect(systemUnderTest).toBeInstanceOf(PresentationBuilder);
  });
});
