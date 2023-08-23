import HelpDeskButtonBuilder from "../../../../../Core/Presentation/React/GeneralComponents/HelpDeskButton/HelpDeskButtonBuilder";
describe("HelpDeskButtonBuilder", () => {
  let systemUnderTest: HelpDeskButtonBuilder;

  beforeEach(() => {
    systemUnderTest = new HelpDeskButtonBuilder();
  });
  test("builder does its job of building the mvc construct", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["viewModel"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeDefined();
  });
});
