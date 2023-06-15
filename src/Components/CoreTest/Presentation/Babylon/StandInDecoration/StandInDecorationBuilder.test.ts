import StandInDecorationBuilder from "../../../../Core/Presentation/Babylon/StandInDecoration/StandInDecorationBuilder";
import PresentationBuilder from "../../../../Core/Presentation/PresentationBuilder/PresentationBuilder";

describe("StandInDecorationBuilder", () => {
  let systemUnderTest: StandInDecorationBuilder;

  beforeEach(() => {
    systemUnderTest = new StandInDecorationBuilder();
  });

  test("constructor", () => {
    expect(systemUnderTest).toBeInstanceOf(PresentationBuilder);
  });
});
