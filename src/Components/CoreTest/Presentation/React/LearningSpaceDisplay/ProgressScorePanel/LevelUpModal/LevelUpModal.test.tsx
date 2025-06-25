import { fireEvent, render } from "@testing-library/react";
import LevelUpModalViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/LevelUpModal/LevelUpModalViewModel";
import useBuilderMock from "../../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import LevelUpModal from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/LevelUpModal/LevelUpModal";
import LevelUpModalController from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/LevelUpModal/LevelUpModalController";
import mock from "jest-mock-extended/lib/Mock";

describe("LevelUpModal", () => {
  let viewModelMock: LevelUpModalViewModel;
  const controllerMock = mock<LevelUpModalController>();

  beforeEach(() => {
    viewModelMock = new LevelUpModalViewModel();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("returns null when viewModel and controller are not registered", () => {
    useBuilderMock([undefined, undefined]);
    const comp = render(<LevelUpModal></LevelUpModal>);
    expect(comp.container).toBeEmptyDOMElement();
  });

  test("closes window automatically when model is set to isOpen", () => {
    jest.useFakeTimers();
    viewModelMock.isOpen.Value = true;
    useBuilderMock([viewModelMock, controllerMock]);

    const comp = render(<LevelUpModal></LevelUpModal>);

    jest.advanceTimersByTime(viewModelMock.timeToClose + 1);
    expect(controllerMock.close).toHaveBeenCalled();
  });

  test("closes window if close button is clicked", () => {
    jest.useFakeTimers();
    viewModelMock.isOpen.Value = true;
    useBuilderMock([viewModelMock, controllerMock]);

    const comp = render(<LevelUpModal></LevelUpModal>);
    const button = comp.getByRole("button");
    fireEvent.click(button);
    expect(controllerMock.close).toHaveBeenCalled();
  });
});
