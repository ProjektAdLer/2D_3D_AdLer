import NarrativeFrameworkController from "../../../../../../Components/Core/Presentation/React/GeneralComponents/NarrativeFramework/NarrativeFrameworkController";
import NarrativeFrameworkViewModel from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFramework/NarrativeFrameworkViewModel";

const viewModel = new NarrativeFrameworkViewModel();
describe("MenuHeaderBarController", () => {
  let systemUnderTest: NarrativeFrameworkController;

  beforeEach(() => {
    systemUnderTest = new NarrativeFrameworkController(viewModel);
  });

  test("closeNarrativeFramework sets open in viewmodel to false", () => {
    viewModel.isOpen.Value = true;
    systemUnderTest.closeNarrativeFramework();
    expect(viewModel.isOpen.Value).toBe(false);
  });
});
