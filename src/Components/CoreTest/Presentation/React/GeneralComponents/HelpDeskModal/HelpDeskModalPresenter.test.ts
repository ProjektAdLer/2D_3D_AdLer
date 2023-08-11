import mock from "jest-mock-extended/lib/Mock";
import HelpDeskModalPresenter from "../../../../../Core/Presentation/React/GeneralComponents/HelpDeskModal/HelpDeskModalPresenter";
import HelpDeskModalViewModel from "../../../../../Core/Presentation/React/GeneralComponents/HelpDeskModal/HelpDeskModalViewModel";

describe("HelpDeskModalPresenter", () => {
  let systemUnderTest: HelpDeskModalPresenter;
  let viewModelMock: HelpDeskModalViewModel;

  beforeEach(() => {
    viewModelMock = mock<HelpDeskModalViewModel>();
    systemUnderTest = new HelpDeskModalPresenter(viewModelMock);
  });

  test("should call openModal", () => {
    systemUnderTest.openModal();
    expect(viewModelMock.isOpen.Value).toBe(true);
  });
});
