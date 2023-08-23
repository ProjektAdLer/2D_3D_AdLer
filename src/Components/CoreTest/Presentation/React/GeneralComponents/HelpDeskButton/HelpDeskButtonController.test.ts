import { mock } from "jest-mock-extended";
import HelpDeskButtonController from "../../../../../Core/Presentation/React/GeneralComponents/HelpDeskButton/HelpDeskButtonController";
import HelpDeskModalPresenter from "../../../../../Core/Presentation/React/GeneralComponents/HelpDeskModal/HelpDeskModalPresenter";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";

const helpDeskModalPresenterMock = mock<HelpDeskModalPresenter>();
describe("HelpDeskButtonController", () => {
  let systemUnderTest: HelpDeskButtonController;

  beforeEach(() => {
    systemUnderTest = new HelpDeskButtonController();
  });
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IHelpDeskModalPresenter
    ).toConstantValue(helpDeskModalPresenterMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should call onHelpDeskButtonClicked", () => {
    systemUnderTest.onHelpDeskButtonClicked();
    expect(helpDeskModalPresenterMock.openModal).toHaveBeenCalled();
  });
});
